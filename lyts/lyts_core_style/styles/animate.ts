/**
 * Helper class for animate css framework.
 */
import ElementWrapper from "../../lyts_core/view/components/ElementWrapper";

class Animate {


    public bounce(elem: ElementWrapper, callback?: Function) {
        
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