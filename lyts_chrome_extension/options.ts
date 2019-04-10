import ly from "../lyts/lyts_core/ly";
import BaseObject from "../lyts/lyts_core/commons/BaseObject";
import constants from "./application/constants";


class options
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

    public start(): void {
        chrome.runtime.sendMessage({action: "showPageAction"});
        ly.console.log("content.start", "starting content at:" + new Date());
    }

    /**
     * This method is expected from ConversaCon controller to remove running app
     */
    public remove(): void {
        try {

            // remove local listeners, too
            ly.Application.events.off(this);

        } catch (err) {
            ly.console.error("launcher.remove()", err)
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        // init application scope
        BaseObject.PREFIX = constants.uid + "_"; // application uid become component prefix.

        ly.console.uid = constants.uid + "-" + constants.version;
        ly.console.level = constants.LOG_LEVEL;

        // local i18n
        ly.Application.events.on(this, ly.i18n.EVENT_CHANGE_LANG, this.onLocalChangeLang);
    }

    private onLocalChangeLang(lang: string): void {

    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: options;

    static instance(): options {
        if (null == options.__instance) {
            options.__instance = new options();
        }
        return options.__instance;
    }

}

// ------------------------------------------------------------------------
//                      S T A R T   A P P L I C A T I O N
// ------------------------------------------------------------------------


options.instance().start();