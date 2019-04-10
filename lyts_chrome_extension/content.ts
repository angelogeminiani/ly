import ly from "../lyts/lyts_core/ly";
import BaseObject from "../lyts/lyts_core/commons/BaseObject";
import constants from "./application/constants";
import ModelMessage, {ActionType} from "./application/model/ModelMessage";
import Runtime from "./application/controller/chrome/Runtime";
import globals from "./application/globals";
import HTMLParser, {HTMLLink} from "./application/controller/parse/HTMLParser";
import UrlParser from "../lyts/lyts_core/view/UrlParser";

/**
 * This code is injected in each Tab that support the extension.
 * API are limited, but you can use messages to communicate with delegates
 */
class content
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
        ly.console.debug("content.start", "starting content at:" + new Date());

        if (!!globals.$) {
            globals.$(() => {
                // send event to enable show popup
                Runtime.sendMessage(ModelMessage.create({action: ActionType.showPageAction}));


                // try to inspect content
                this.inspectContent();
            });
        } else {
            ly.console.error("content.start", "jQuery not loaded.");
        }
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

    private inspectContent(): void {
        // send event to inject a script
        /**
         Runtime.sendMessage(ModelMessage.create({
                action: ActionType.execute,
                parameters: {
                    file: "app/inject/get_content.js",
                    tab_id: tabId
                }
            }));**/

        ly.lang.funcDelay(() => {

            const html: string = globals.$("body")[0].innerHTML;
            const root:string = document.location.origin;
            const links: Array<HTMLLink> = HTMLParser.create(html).links(root, true);
            ly.console.debug("content.inspectContent", root, links);

        }, 1000);
    }


    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: content;

    static instance(): content {
        if (null == content.__instance) {
            content.__instance = new content();
        }
        return content.__instance;
    }

}

// ------------------------------------------------------------------------
//                      S T A R T   A P P L I C A T I O N
// ------------------------------------------------------------------------


content.instance().start();