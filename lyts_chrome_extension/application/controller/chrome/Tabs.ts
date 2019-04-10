import ly from "../../../../lyts/lyts_core/ly";
import BaseObject from "../../../../lyts/lyts_core/commons/BaseObject";
import Tab = chrome.tabs.Tab;
import InjectDetails = chrome.tabs.InjectDetails;
import HighlightInfo = chrome.tabs.HighlightInfo;
import TabRemoveInfo = chrome.tabs.TabRemoveInfo;
import TabChangeInfo = chrome.tabs.TabChangeInfo;
import TabAttachInfo = chrome.tabs.TabAttachInfo;
import TabMoveInfo = chrome.tabs.TabMoveInfo;
import TabDetachInfo = chrome.tabs.TabDetachInfo;
import TabActiveInfo = chrome.tabs.TabActiveInfo;
import TabWindowInfo = chrome.tabs.TabWindowInfo;
import ZoomChangeInfo = chrome.tabs.ZoomChangeInfo;

enum TabEvents {
    onUpdated = "on_updated",
    onActivated = "on_activated",
    onRemoved = "on_activated"
}

type TabHighlightedCallback = (highlightInfo: HighlightInfo) => void;
type TabRemovedCallback = (tabId: number, removeInfo: TabRemoveInfo) => void;
type TabUpdatedCallback = (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void;
type TabAttachedCallback = (tabId: number, attachInfo: TabAttachInfo) => void;
type TabMovedCallback = (tabId: number, moveInfo: TabMoveInfo) => void;
type TabDetachedCallback = (tabId: number, detachInfo: TabDetachInfo) => void;
type TabCreatedCallback = (tab: Tab) => void;
type TabActivatedCallback = (activeInfo: TabActiveInfo) => void;
type TabReplacedCallback = (addedTabId: number, removedTabId: number) => void;
type TabSelectedCallback = (tabId: number, selectInfo: TabWindowInfo) => void;
type TabZoomChangeCallback = (ZoomChangeInfo: ZoomChangeInfo) => void;

type EventCallback = TabHighlightedCallback | TabRemovedCallback | TabUpdatedCallback
    | TabAttachedCallback | TabMovedCallback | TabDetachedCallback | TabCreatedCallback | TabActivatedCallback
    | TabReplacedCallback | TabSelectedCallback | TabZoomChangeCallback;

/**
 * chrome.tabs Helper
 */
class Tabs
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


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {

    }

    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------

    /**
     * Return current active tab.
     * @param callback
     */
    public static getActive(callback: (error: any, tab: Tab | null) => void): void {
        try {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs: Array<Tab>) {
                try {
                    if (!!tabs && tabs.length > 0) {
                        const tab: Tab = tabs[0];
                        if (!!tab && tab.id != undefined) {
                            ly.lang.funcInvoke(callback, null, tab);
                        } else {
                            ly.lang.funcInvoke(callback, "Invalid tab: Tab has not a valid id", null);
                        }
                    } else {
                        ly.lang.funcInvoke(callback, null, null);
                    }
                } catch (err) {
                    ly.lang.funcInvoke(callback, err, null);
                }
            });
        } catch (err) {
            ly.lang.funcInvoke(callback, err, null);
        }
    }

    public static executeScript(raw_tab_id: number | null, details: InjectDetails, callback: (error: any, response: any) => void): void {
        try {
            Tabs.validateTabId(raw_tab_id, (tab_id: number) => {
                if (tab_id > -1) {
                    chrome.tabs.executeScript(tab_id, details, (response: any) => {
                        if (!!chrome.runtime.lastError) {
                            const err: string = chrome.runtime.lastError.message || "";
                            if (!!err) {
                                ly.lang.funcInvoke(callback, err, response);
                            } else {
                                ly.lang.funcInvoke(callback, false, response);
                            }
                        } else {
                            ly.lang.funcInvoke(callback, false, response);
                        }
                    });
                } else {
                    // invalid tab index
                    ly.lang.funcInvoke(callback, "Unable to process the script", null);
                }
            });
        } catch (err) {
            ly.lang.funcInvoke(callback, err, null);
        }
    }

    public static addListener(event: TabEvents, callback: EventCallback) {
        if (event === TabEvents.onUpdated) {
            chrome.tabs.onUpdated.addListener(callback as TabUpdatedCallback);
        } else if (event == TabEvents.onActivated) {
            chrome.tabs.onActivated.addListener(callback as TabActivatedCallback);
        } else if (event == TabEvents.onRemoved) {
            chrome.tabs.onRemoved.addListener(callback as TabRemovedCallback);
        }
    }

    public static removeListener(event: TabEvents, callback: EventCallback) {
        if (event === TabEvents.onUpdated) {
            chrome.tabs.onUpdated.removeListener(callback as TabUpdatedCallback); // (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void
        } else if (event == TabEvents.onActivated) {
            chrome.tabs.onActivated.removeListener(callback as TabActivatedCallback); // (activeInfo: TabActiveInfo) => void
        } else if (event == TabEvents.onRemoved) {
            chrome.tabs.onRemoved.removeListener(callback as TabRemovedCallback);  // (tabId: number, removeInfo: TabRemoveInfo) => void
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private static validateTabId(tab_id: number | null, callback: (tab_id: number) => void): void {
        if (null !== tab_id) {
            ly.lang.funcInvoke(callback, tab_id);
        } else {
            Tabs.getActive((err: any, tab: Tab) => {
                if (!!err) {
                    ly.console.error("Tabs.validateTabId", err);
                }
                if (!!tab && !!tab.id) {
                    ly.lang.funcInvoke(callback, tab.id);
                } else {
                    ly.lang.funcInvoke(callback, -1);
                }
            });
        }
    }

}

// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------

export default Tabs;
export {TabEvents};