import animate from "./styles/animate";
import dom from "../lyts_core/view/dom";

/**
 * Supported modules
 */
enum StyleModule {
    animate,
}

/**
 * Singleton manager for application styles.
 * StyleManager allow to inject styles into html head
 */
class StyleManagerClass {


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {

    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    /**
     * Inject style directly to head
     * @param props
     * @param {StyleModule} modules
     */
    public inject(props: any, ...modules: StyleModule[]): void {
        // creates css directives
        let css = '';
        for (let module of modules) {
            css += this.loadModule(props, module);
        }
        dom.injectStyle(css);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private loadModule(props: any, module: StyleModule) {
        let module_content: string;
        if (module === StyleModule.animate) {
            module_content = animate(props);
        } else {
            module_content = '';
        }
        return module_content.split('<style>').join('\n').split('</style>').join('\n');
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
