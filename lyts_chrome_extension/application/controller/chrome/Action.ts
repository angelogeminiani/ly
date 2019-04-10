import BaseObject from "../../../../lyts/lyts_core/commons/BaseObject";

type actionCallback = (tab: chrome.tabs.Tab) => void;

type actionType = "browserAction" | "pageAction";

/**
 * Extension type helper;
 *
 * chrome.browserAction
 * chrome.pageAction
 */
class Action
    extends BaseObject {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _type: actionType

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

    public get type(): string {
        return this._type;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public addListener(callback: actionCallback): void {
        if (this.type === "browserAction") {
            chrome.browserAction.onClicked.addListener(callback);
        } else if (this.type === "pageAction") {
            chrome.pageAction.onClicked.addListener(callback);
        }

    }

    public removeListener(callback: actionCallback): void {
        if (this.type === "browserAction") {
            chrome.browserAction.onClicked.removeListener(callback);
        } else if (this.type === "pageAction") {
            chrome.pageAction.onClicked.removeListener(callback);
        }
    }

    public enable(tab_id: number): void {
        if (this.type === "browserAction") {
            chrome.browserAction.enable(tab_id);
        } else if (this.type === "pageAction") {
            chrome.pageAction.show(tab_id);
        }
    }

    public disable(tab_id: number): void {
        if (this.type === "browserAction") {
            chrome.browserAction.disable(tab_id);
        } else if (this.type === "pageAction") {
            chrome.pageAction.hide(tab_id);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        if (!!chrome.pageAction) {
            this._type = "pageAction";
        }

        if (!!chrome.browserAction) {
            this._type = "browserAction";
        }
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: Action;

    static instance(): Action {
        if (null == Action.__instance) {
            Action.__instance = new Action();
        }
        return Action.__instance;
    }


}

// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------

export default Action.instance();