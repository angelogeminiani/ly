/**
 * Helper class for animate css framework.
 */
import ElementWrapper from "../../lyts_core/view/components/ElementWrapper";
import {StyleManager, StyleModule} from "../StyleManager";
import lang from "../../lyts_core/commons/lang";

class AnimateClass {


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        StyleManager.inject(StyleModule.animate);
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public bounce(elem: ElementWrapper, callback?: Function) {
        elem.addEventListener('animationend', (e: Event) => {
            e.preventDefault();
            elem.removeEventListener('animationend');
            elem.classRemove('bounce');
            if(!!callback && lang.isFunction(callback)){
                lang.funcInvoke(callback);
            }
        });
        elem.classAdd('animated');
        elem.classAdd('bounce');
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: AnimateClass;

    public static instance(): AnimateClass {
        if (null == AnimateClass.__instance) {
            AnimateClass.__instance = new AnimateClass();
        }
        return AnimateClass.__instance;
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

const Animate: AnimateClass = AnimateClass.instance();

export default Animate;