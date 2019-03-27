/**
 * Math class
 */

class mathClass {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {

    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    public round(value: number, decimals: number = 0): number {
        if (decimals === 0) {
            return Math.round(value);
        } else {
            const pow: number = Math.pow(10, decimals);
            return Math.round(value * pow) / pow;
        }
    }

    public ceil(value: number, decimals: number = 0): number {
        if (decimals === 0) {
            return Math.ceil(value);
        } else {
            const pow: number = Math.pow(10, decimals);
            return Math.ceil(value * pow) / pow;
        }
    }

    public floor(value: number, decimals: number = 0): number {
        if (decimals === 0) {
            return Math.floor(value);
        } else {
            const pow: number = Math.pow(10, decimals);
            return Math.floor(value * pow) / pow;
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: mathClass;

    public static instance(): mathClass {
        if (null == mathClass.__instance) {
            mathClass.__instance = new mathClass();
        }
        return mathClass.__instance;
    }


}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

const math: mathClass = mathClass.instance();
export default math;


