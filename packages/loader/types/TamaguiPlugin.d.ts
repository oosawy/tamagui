import { TamaguiOptions } from '@tamagui/static';
import type { Compiler, RuleSetRule } from 'webpack';
export type PluginOptions = TamaguiOptions & {
    isServer?: boolean;
    enableStudio?: boolean;
    exclude?: RuleSetRule['exclude'];
    test?: RuleSetRule['test'];
    jsLoader?: any;
    disableEsbuildLoader?: boolean;
    disableModuleJSXEntry?: boolean;
    disableWatchConfig?: boolean;
};
export declare class TamaguiPlugin {
    options: PluginOptions;
    pluginName: string;
    constructor(options?: PluginOptions);
    removeDuplicates(cssContent: any): string;
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=TamaguiPlugin.d.ts.map