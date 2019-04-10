import ly from "../lyts/lyts_core/ly";
import BaseObject from "../lyts/lyts_core/commons/BaseObject";
import constants from "./application/constants";
import Tabs, {TabEvents} from "./application/controller/chrome/Tabs";
import ModelMessage, {ActionType} from "./application/model/ModelMessage";
import Runtime from "./application/controller/chrome/Runtime";
import Action from "./application/controller/chrome/Action";
import MessageSender = chrome.runtime.MessageSender;
import Tab = chrome.tabs.Tab;
import TabChangeInfo = chrome.tabs.TabChangeInfo;


/**
 * background script starts immediately when extension is installed or when browser is opened
 */
class background
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
        // background starts immediately when browser is opened
        // ly.console.log("background.start", "starting background at: " + new Date());

        // message: any, sender: MessageSender, sendResponse: (response: any) => void
        Runtime.addListener(this.onMessage);
        Tabs.addListener(TabEvents.onUpdated, this.onTabUpdated);
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

    private onMessage(raw_message: any, sender: MessageSender, sendResponse: (response: any) => void): void {
        ly.console.debug("background.onMessage", "received at: " + new Date(), raw_message);
        const message: ModelMessage = ModelMessage.create(raw_message);
        if (!!message) {
            if (message.action == ActionType.showPageAction) {
                // MESSAGE TO ENABLE EXTENSION IN CURRENT TAB
                Tabs.getActive((err: any, tab: Tab | null) => {
                    if (!!tab && tab.id !== undefined) {
                        ly.console.debug("background.onMessage#tabs.query", tab);
                        Action.enable(tab.id);
                    }
                });
            } else if (message.action == ActionType.execute && !!message.parameters) {
                // RECEIVED A MESSAGE TO INJECT A SCRIPT
                const script: string = ly.objects.get(message.parameters, "script");
                const file: string = ly.objects.get(message.parameters, "file");
                const tab_id: number | null = ly.objects.get(message.parameters, "tab_id");
                const details: any = {};
                if (!!script) {
                    details.script = script;
                } else if (!!file) {
                    details.file = file;
                }
                Tabs.executeScript(tab_id, details, (err: any, response: any) => {
                    ly.console.debug("background.onMessage#ActionType.execute", response);
                });
            } else if (message.action == ActionType.response && !!message.parameters) {
                // RECEIVED A MESSAGE WITH A RESPONSE
                const script: string = ly.objects.get(message.parameters, "script");
                const response: any = ly.objects.get(message.parameters, "response");
                if (!!script && response != undefined) {
                    ly.console.debug("background.onMessage#ActionType.response", script, response);
                }
            }
        }

    }

    private onTabUpdated(tabId: number, changeInfo: TabChangeInfo, tab: Tab): void {
        if (!!changeInfo && changeInfo.status === "complete") {
            ly.console.debug("background.onTabUpdated", tabId, changeInfo, tab);



            ly.lang.funcDelay(() => {
                Tabs.executeScript(tabId, {file: "app/inject/get_content.js"}, (err: any, response: any) => {
                });
            }, 1000);
        }
    }

    private onLocalChangeLang(lang: string): void {

    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: background;

    static instance(): background {
        if (null == background.__instance) {
            background.__instance = new background();
        }
        return background.__instance;
    }

}

// ------------------------------------------------------------------------
//                      S T A R T   A P P L I C A T I O N
// ------------------------------------------------------------------------


background.instance().start();