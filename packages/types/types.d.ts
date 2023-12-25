export interface TamaguiOptions {
  platform: 'native' | 'web'

  /**
   * module paths you want to compile with tamagui (for example ['tamagui'])
   * */
  components: string[]

  /**
   * your tamagui.config.ts
   */
  config?: string

  /**
   * Use the new ThemeBuilder in `@tamagui/create-theme` to create beautiful theme sets,
   * see docs at https://tamagui.dev/docs/guides/theme-builder
   */
  themeBuilder?: {
    input: string
    output: string
  }

  /**
   * Emit design system related CSS during build step for usage with frameworks
   */
  outputCSS?: string | null | false

  /**
   * Tamagui can follow imports and evaluate them when parsing styles, leading to
   * higher percent of flattened / optimized views. We normalize this to be the
   * full path of the file, always ending in ".js".
   *
   * So to have Tamagui partially evaluate "app/src/constants.tsx" you can put
   * ["app/src/constants.js"].
   */
  importsWhitelist?: string[]
  /**
   * Whitelist file extensions to evaluate
   *
   * @default ['.tsx', '.jsx']
   */
  includeExtensions?: string[]
  /**
   * Web-only. Allows you to trim the bundle size of react-native-web.
   * Pass in values like ['Switch', 'Modal'].
   */
  excludeReactNativeWebExports?: string[]
  /**
   * Enable logging the time it takes to extract.
   *
   * @default true
   */
  logTimings?: boolean
  /**
   * Custom prefix for the timing logs
   */
  prefixLogs?: string

  /**
   * (Advanced) Enables Tamagui to try and evaluate components outside the `components` option.
   * When true, Tamagui will bundle and load components as its running across every file,
   * if it loads them successfully it will perform all optimiziations inline.
   */
  enableDynamicEvaluation?: boolean

  /**
   * Completely disable tamagui for these files
   */
  disable?: boolean | string[]
  /**
   * Disable just optimization for these files, but enable helpful debug attributes.
   */
  disableExtraction?: boolean | string[]
  /**
   * Disable just the addition of data- attributes that are added in dev mode to help
   * tie DOM to your filename/component-name.
   */
  disableDebugAttr?: boolean
  /**
   * (Advanced) Disable evaluation of useMedia() hook
   */
  disableExtractInlineMedia?: boolean
  /**
   * (Advanced) Disable just view flattening.
   */
  disableFlattening?: boolean
  /**
   * (Advanced) Disable extracting to theme variables.
   */
  disableExtractVariables?: boolean | 'theme'

  evaluateVars?: boolean
  cssPath?: string
  cssData?: any
  deoptProps?: Set<string>
  excludeProps?: Set<string>
  inlineProps?: Set<string>
  forceExtractStyleDefinitions?: boolean

  /**
   * (Experimental) Will flatten theme value usages on native as well
   */
  experimentalFlattenThemesOnNative?: boolean
  /**
   * combine all css files into one file
   */
  cssFileName?: string
}

// for cli

export type CLIUserOptions = {
  root?: string
  host?: string
  tsconfigPath?: string
  tamaguiOptions: Partial<TamaguiOptions>
  debug?: boolean | 'verbose'
}

export type CLIResolvedOptions = {
  root: string
  port?: number
  host?: string
  mode: 'development' | 'production'
  debug?: UserOptions['debug']
  tsconfigPath: string
  tamaguiOptions: TamaguiOptions
  pkgJson: {
    name?: string
    main?: string
    module?: string
    source?: string
    exports?: Record<string, Record<string, string>>
  }
  paths: {
    dotDir: string
    conf: string
    types: string
  }
}
