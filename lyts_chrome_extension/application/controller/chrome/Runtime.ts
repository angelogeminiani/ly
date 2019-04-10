import BaseObject from "../../../../lyts/lyts_core/commons/BaseObject";
import ModelMessage from "../../model/ModelMessage";
import MessageSender = chrome.runtime.MessageSender;

type responseCallback = (response: any) => void;
type messageCallback = (message: any, sender: MessageSender, sendResponse: responseCallback) => void;

/**
 * chrome.runtime helper
 */
class Runtime
    extends BaseObject {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    private constructor() {
        super();

        this.init();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public sendMessage(message: ModelMessage, responseCallback?: responseCallback): void {
        chrome.runtime.sendMessage(message, responseCallback);
    }

    public addListener(callback: messageCallback): void {
        chrome.runtime.onMessage.addListener(callback);
    }

    public removeListener(callback: messageCallback): void {
        chrome.runtime.onMessage.removeListener(callback);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {

    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: Runtime;

    static instance(): Runtime {
        if (null == Runtime.__instance) {
            Runtime.__instance = new Runtime();
        }
        return Runtime.__instance;
    }


}

// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------

export default Runtime.instance();