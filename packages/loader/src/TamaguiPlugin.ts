import { TamaguiOptions, loadTamagui, watchTamaguiConfig } from '@tamagui/static'
import type { Compiler, RuleSetRule } from 'webpack'

export type PluginOptions = TamaguiOptions & {
  isServer?: boolean
  enableStudio?: boolean
  exclude?: RuleSetRule['exclude']
  test?: RuleSetRule['test']
  jsLoader?: any
  disableEsbuildLoader?: boolean
  disableModuleJSXEntry?: boolean
  disableWatchConfig?: boolean
  outputFileName?: string
}

export class TamaguiPlugin {
  pluginName = 'TamaguiPlugin'

  constructor(
    public options: PluginOptions = {
      platform: 'web',
      components: ['@tamagui/core'],
    }
  ) {}

  // TODO: make sure this is working correctly
  removeDuplicates(cssContent) {
    const rules = cssContent.split(/(?<={)/g)
    const uniqueRules = new Set()

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i].trim()

      if (rule) {
        uniqueRules.add(rule)
      }
    }

    return Array.from(uniqueRules).join('\n')
  }

  apply(compiler: Compiler) {
    if (compiler.watchMode && !this.options.disableWatchConfig) {
      void watchTamaguiConfig(this.options).then((watcher) => {
        // yes this is weirdly done promise...
        process.once('exit', () => {
          watcher.dispose()
        })
      })
    }

    compiler.hooks.beforeRun.tapPromise(this.pluginName, async () => {
      await loadTamagui(this.options)
    })

    // mark as side effect
    compiler.hooks.normalModuleFactory.tap(this.pluginName, (nmf) => {
      nmf.hooks.createModule.tap(
        this.pluginName,
        // @ts-expect-error CreateData is typed as 'object'...
        (createData: { matchResource?: string; settings: { sideEffects?: boolean } }) => {
          if (createData.matchResource?.endsWith('.tamagui.css')) {
            createData.settings.sideEffects = true
          }
        }
      )
    })

    compiler.hooks.emit.tapAsync('CombineCSSPlugin', (compilation, callback) => {
      const { outputFileName = 'allStyles.css' } = this.options
      const cssFiles = Object.keys(compilation.assets).filter((asset) =>
        asset.endsWith('.css')
      )

      if (cssFiles.length === 0) {
        callback()
        return
      }

      const combinedCSS = cssFiles.reduce((acc, file) => {
        const cssContent = compilation.assets[file].source()
        return `${acc}${cssContent}`
      }, '')

      const deDuplicatedCSS = this.removeDuplicates(combinedCSS)

      // TODO: need to handle map, sourceMap, buffer, and updateHashCorrectly
      compilation.assets[outputFileName] = {
        source: () => deDuplicatedCSS,
        size: () => deDuplicatedCSS.length,
        updateHash: (hash) => {
          compilation.assets[outputFileName].updateHash(hash)
        },
        buffer: () => {
          return Buffer.from(deDuplicatedCSS, 'utf-8')
        },
        // map: compilation.assets[outputFileName].map,
        // sourceAndMap: () => {
        //   const { source, map } = compilation.assets[outputFileName].sourceAndMap()
        //   return { source, map }
        // },
      }

      cssFiles.forEach((file) => {
        if (file !== outputFileName) {
          delete compilation.assets[file]
        }
      })

      callback()
    })

    compiler.options.resolve.extensions = [
      ...new Set([
        '.web.tsx',
        '.web.ts',
        '.web.js',
        '.ts',
        '.tsx',
        '.js',
        ...(compiler.options.resolve.extensions || []),
      ]),
    ]

    // look for compiled js with jsx intact as specified by module:jsx
    const mainFields = compiler.options.resolve.mainFields
    if (mainFields) {
      compiler.options.resolve.mainFields = Array.isArray(mainFields)
        ? mainFields
        : [mainFields]
      if (!this.options.disableModuleJSXEntry) mainFields.unshift('module:jsx')
    }

    if (!compiler.options.module) {
      return
    }

    const { jsLoader } = this.options

    const existing = compiler.options.module.rules as any[]

    const rules =
      (existing.find((x) => (typeof x === 'object' && 'oneOf' in x ? x : null))
        ?.oneOf as any[]) ?? existing

    const nextJsRules = rules.findIndex(
      (x) => x?.use && x.use.loader === 'next-swc-loader' && x.issuerLayer !== 'api'
    )

    const esbuildLoader = {
      loader: require.resolve('esbuild-loader'),
      options: {
        target: 'es2021',
        keepNames: true,
        loader: 'tsx',
        tsconfigRaw: {
          module: this.options.isServer ? 'commonjs' : 'esnext',
          isolatedModules: true,
          resolveJsonModule: true,
        },
      },
    }

    if (!this.options.disable) {
      const tamaguiLoader = {
        loader: require.resolve('tamagui-loader'),
        options: {
          ...this.options,
          _disableLoadTamagui: true,
        },
      }

      if (nextJsRules === -1) {
        existing.push({
          // looks like its in jsx dir (could be better but windows path sep)
          test: /jsx.*\.m?[jt]sx?$/,
          exclude: this.options.exclude,
          resolve: {
            fullySpecified: false,
          },
          use: [esbuildLoader],
        })

        // app dir or not next.js
        existing.push({
          test: this.options.test ?? /\.m?[jt]sx?$/,
          exclude: this.options.exclude,
          resolve: {
            fullySpecified: false,
          },
          use: [tamaguiLoader],
        })
      } else if (!this.options.disableEsbuildLoader) {
        const startIndex = nextJsRules ? nextJsRules + 1 : 0
        const existingLoader = nextJsRules ? rules[startIndex] : undefined

        rules.splice(startIndex, 0, {
          test: this.options.test ?? /\.m?[jt]sx?$/,
          exclude: this.options.exclude,
          resolve: {
            fullySpecified: false,
          },
          use: [
            ...(jsLoader ? [jsLoader] : []),
            ...(existingLoader && nextJsRules ? [].concat(existingLoader.use) : []),
            ...(!(jsLoader || existingLoader) ? [esbuildLoader] : []),
            tamaguiLoader,
          ],
        })
      }
    }
  }
}
