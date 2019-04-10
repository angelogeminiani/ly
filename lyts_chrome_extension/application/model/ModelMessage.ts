import ly from "../../../lyts/lyts_core/ly";

/**
 * Extend adding new types for more messaging options....
 */
enum ActionType {
    none = "none",
    showPageAction = "showPageAction", // enable a pageAction in current tab
    execute = "execute", // execute javascript running a file
    response = "response",
}

/**
 * The Message class
 */
class ModelMessage {

    action: ActionType;
    parameters:any;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        this.action = ActionType.none;
        this.parameters = false;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      F A C T O R Y
    // ------------------------------------------------------------------------

    static create(params?: any): ModelMessage {
        const response: ModelMessage = new ModelMessage();
        if (!!params) {
            for (let key in params) {
                if (params.hasOwnProperty(key) && response.hasOwnProperty(key)) {
                    ly.objects.set(response, key, params[key]);
                }
            }
        }
        return response;
    }

}

// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------

export default ModelMessage;
export {ActionType};