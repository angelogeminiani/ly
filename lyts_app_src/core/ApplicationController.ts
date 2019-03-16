import ly from "../../lyts/lyts_core/ly";
import {Listener} from "../../lyts/lyts_core/commons/events/Events";
import EventEmitter from "../../lyts/lyts_core/commons/events/EventEmitter";
import AuthHelper from "./account/AuthHelper";
import {Router} from "../../lyts/lyts_core/view/Router";
import constants from "../constants";


/**
 * Main APPLICATION controller.
 * Use this singleton to access application status ang global methods.
 */
class ApplicationController {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _app_context: {
        account: any // current user
    };

    private _auth_helper: AuthHelper;

    private readonly _page_params: any; // parameters passed to pages

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    private constructor() {
        this._auth_helper = new AuthHelper();

        this._app_context = {
            account: null
        };
        this._page_params = {};
    }

    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------

    public get events(): EventEmitter {
        return ly.Application.events;
    }

    public get auth(): AuthHelper {
        return this._auth_helper;
    }


    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    /**
     * Return Application context
     * @param {Listener} callback Pass to listener a Context object
     * @param {boolean} force Use to reload auth_context
     */
    public ready(callback: Listener, force?: boolean): void {
        if (force || !this._app_context.account) {
            this.auth.authenticate('', '', (error, model_account) => {
                if (!!error) {
                    console.error("ApplicationController.ready#authenticate", error);
                    ly.lang.funcInvoke(callback, false);
                } else {
                    if (!!model_account) {
                        // set account
                        this._app_context.account = model_account;
                        if (!!this.auth.company_id) {
                            ly.lang.funcInvoke(callback, this._app_context);
                        } else {
                            ly.lang.funcInvoke(callback, false);
                        }
                    } else {
                        ly.lang.funcInvoke(callback, false);
                    }

                }
            });
        } else {
            ly.lang.funcInvoke(callback, this._app_context);
        }
    }

    /**
     * Exit from applicazion
     */
    public exit(): void {
        this.auth.exit();
        this._app_context.account = null;
    }

    public get user_id(): string {
        return this._auth_helper.user_id;
    }

    public get username(): string {
        return this.auth.username;
    }

    public get lang(): string {
        return this.auth.lang;
    }

    public get supportedLanguages(): Array<any> {
        const response: Array<any> = [];
        response.push(
            {
                value: "it",
                caption: "Italiano"
            },
            {
                value: "en",
                caption: "English"
            },
        );
        return response;
    }

    public supportedLanguage(value: string): any {
        const languages: Array<any> = this.supportedLanguages;
        for (let i = 0; i < languages.length; i++) {
            const lang: any = languages[i];
            if (lang.value === value) {
                return lang;
            }
        }
        return languages[0];
    }

    public get supportedLanguageCodes(): Array<string> {
        const languages: Array<any> = this.supportedLanguages;
        const response: Array<string> = [];
        languages.forEach((item) => {
            response.push(item.value);
        });

        return response;
    }

    public get supportedLanguageCaptions(): Array<string> {
        const languages: Array<any> = this.supportedLanguages;
        const response: Array<string> = [];
        languages.forEach((item) => {
            response.push(item.caption);
        });

        return response;
    }

    /**
     * Internal navigation
     * @param path  i.e "screen/page"
     * @param params optional params to pass to page
     */
    public goto(path: string, params?: any): void {
        this.params[path] = params || false;
        Router.instance().goto(path);
    }

    /**
     * Sample usage: ApplicationController.params[PageManagePeopleEdit.ADDRESS]
     */
    public get params(): any {
        return this._page_params;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: ApplicationController;

    public static instance(): ApplicationController {
        if (null == ApplicationController.__instance) {
            ApplicationController.__instance = new ApplicationController();
        }
        return ApplicationController.__instance;
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default ApplicationController.instance();