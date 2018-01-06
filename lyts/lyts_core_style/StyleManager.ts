import animate_css from "./styles/animate/animate_css";
import dom from "../lyts_core/view/dom";

const DEF_CHARSET = 'UTF-8'; // @charset "UTF-8";
/**
 * Supported modules
 */
enum StyleModule {

    animate,   // animate css

}

/**
 * Singleton manager for application styles.
 * StyleManager allow to inject styles into html head
 */
class StyleManagerClass {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _use_one_style_tag: boolean;
    private _hystory: StyleModule[];

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        this._use_one_style_tag = false;
        this._hystory = [];
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public get useOneStyleTag(): boolean {
        return this._use_one_style_tag;
    }

    public set useOneStyleTag(value: boolean) {
        this._use_one_style_tag = value;
    }

    /**
     * Inject style directly to head
     * @param props
     * @param {StyleModule} modules
     */
    public inject(props: any, ...modules: StyleModule[]): void {
        if (this._use_one_style_tag) {
            this.injectOne(props, ...modules);
        } else {
            this.injectAll(props, ...modules);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private loadModule(props: any, module: StyleModule) {
        let module_content: string;
        // register supported modules
        if (module === StyleModule.animate) {
            module_content = animate_css(props);
        } else {
            module_content = '';
        }
        // console.log(module, module_content);
        return module_content.split('<style>').join('\n').split('</style>').join('\n').trim();
    }

    private injectOne(props: any, ...modules: StyleModule[]): void {
        // creates css directives
        let css = '';
        for (let module of modules) {
            if (this._hystory.indexOf(module) === -1) {
                css += this.loadModule(props, module);
                this._hystory.push(module);
            }
        }

        // add line
        css = '\n' + css + '\n';

        dom.injectStyle(css);
    }

    private injectAll(props: any, ...modules: StyleModule[]): void {
        // creates css directives
        for (let module of modules) {
            if (this._hystory.indexOf(module) === -1) {
                const css = this.loadModule(props, module);
                this._hystory.push(module);
                dom.injectStyle(css);
            }
        }
    }


    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: StyleManagerClass;

    public static instance(): StyleManagerClass {
        if (null == StyleManagerClass.__instance) {
            StyleManagerClass.__instance = new StyleManagerClass();
        }
        return StyleManagerClass.__instance;
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

const StyleManager: StyleManagerClass = StyleManagerClass.instance();

export {StyleManager, StyleModule}
