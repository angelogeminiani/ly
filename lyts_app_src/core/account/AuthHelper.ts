/**
 * Authentication controller.
 *
 * Call authenticate() to login user or auto-login if cookies are stored.
 * Each time the user is authenticated the system do:
 *  - store user in memory (AuthController.user)
 *  - set user language into i18n
 *  - trigger ON_LOGIN event
 *
 *  Call exit() to logout.
 *  If you need to clean cookies, user exit(true).
 *
 */
import cookies from "../../../lyts/lyts_core/view/cookies";
import ly from "../../../lyts/lyts_core/ly";
import constants from "../../constants";
import errors from "../utils/errors";
import {ServiceCallback} from "../services/AbstractService";
import AccountService from "./AccountService";
import ModelAccount, {ModelAccountRole} from "./ModelAccount";

const COOKIE_USER_ID: string = 'user_id';
const COOKIE_USERNAME: string = 'username';
const COOKIE_USER_LANG: string = 'user_lang';
const COOKIE_COMPANY_ID: string = 'company_id';

class AuthHelper {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _srvc_account: AccountService;
    private _user: ModelAccount | null;
    private _cookies_timeout: number;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public constructor() {
        this._srvc_account = AccountService.instance();
        this._cookies_timeout = 20;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    /**
     * Current authorized user
     * @return User
     */
    public get user(): ModelAccount | null {
        return this._user;
    }

    public set user(item: ModelAccount | null) {
        this._user = item;
    }

    public get user_id(): string {
        return !!this.user ? this.user._key : cookies.read(COOKIE_USER_ID);
    }

    public get company_id(): string {
        return cookies.read(COOKIE_COMPANY_ID);
    }

    public set company_id(company_id: string) {
        var current_company_id = this.company_id;
        if (!!company_id) {
            cookies.create(COOKIE_COMPANY_ID, company_id, 0);
        } else {
            cookies.erase(COOKIE_COMPANY_ID);
        }
        if (!current_company_id && !company_id || current_company_id === company_id) {
            // NULL same state
        } else if (!!company_id) {
            if (!!this._user) {
                this._user.current_role = this.getAccountRole(this._user, company_id);
                ly.Application.events.emit(constants.ONBUS_USER_ON, this._user);
            } else {
                ly.Application.events.emit(constants.ONBUS_USER_OFF, false);
            }
        } else {
            ly.Application.events.emit(constants.ONBUS_USER_OFF, false);
        }
    }


    public get username(): string {
        return !!this.user ? this.user.auth.username : cookies.read(COOKIE_USERNAME);
    }

    public get lang(): string {
        return !!this.user ? this.user.lang : cookies.read(COOKIE_USER_LANG) || ly.i18n.lang;
    }

    public set lang(value: string) {
        if (!!value) {
            if (!!this.user) {
                this.user.lang = value;
            }
            cookies.create(COOKIE_USER_LANG, value, this._cookies_timeout);
            ly.i18n.lang = value;
        }
    }

    public get cookies_timeout(): number {
        return this._cookies_timeout;
    }

    public set cookies_timeout(value: number) {
        this._cookies_timeout = value;
    }

    /**
     * Try to authenticate user.
     * Each time this method find a valid accounts, trigger the ON_LOGIN event.
     * Call this method without any parameter for autologin.
     * @param {string} username  (Optional)
     * @param {string} password (Optional)
     * @param {ServiceCallback} callback Callback to handle response
     */
    public authenticate(username?: string, password?: string, callback?: ServiceCallback): void {
        if (!!username && !!password) {
            this._srvc_account.login(username, password, (error: any, response: any) => {
                let ret_user: ModelAccount | null = null;
                if (!error) {
                    ret_user = response[0];
                    // save cookies
                    this.store(ret_user);
                }
                if (!!callback) {
                    ly.lang.funcInvoke(callback, errors.getMessage(error), ret_user);
                }
            });
        } else if (!!this.user) {
            if (!!callback) {
                ly.lang.funcInvoke(callback, null, this.user);
            }
        } else if (!!this.user_id) {
            this._srvc_account.get_account(this.user_id, (error: any, response: Array<any>) => {
                let ret_user: ModelAccount | null = null;
                if (!error) {
                    ret_user = response[0];
                    // save cookies
                    this.store(ret_user);
                }
                if (!!callback) {
                    ly.lang.funcInvoke(callback, errors.getMessage(error), ret_user);
                }
            });
        } else {
            if (!!callback) {
                ly.lang.funcInvoke(callback, "User Not Logged: Login Required!", null);
            }
        }
    }


    public register(username: string, password: string,
                    company_name: string, company_vat: string, company_address: string, callback?: ServiceCallback) {
        if (!!callback && !!username && !!password) {
            try {
                this._srvc_account.register(username, password,
                    company_name, company_vat, company_address, (error: any, response: any) => {
                        let reg_user: ModelAccount | null = null;
                        if (!error) {
                            reg_user = response[0];
                            // save cookies
                            this.store(reg_user);
                        }
                        ly.lang.funcInvoke(callback, errors.getMessage(error), reg_user);
                    });
            } catch (err) {
                ly.lang.funcInvoke(callback, errors.getMessage(err), null);
            }
        }
    }

    public resetPassword(username: string, callback?: ServiceCallback) {
        if (!!callback && !!username) {
            try {
                this._srvc_account.reset_password(username, (error: any, response: any) => {
                    let user: ModelAccount | null = null;
                    if (!error) {
                        user = response[0];
                        this.exit();
                    }
                    ly.lang.funcInvoke(callback, errors.getMessage(error), user);
                });
            } catch (err) {
                ly.lang.funcInvoke(callback, errors.getMessage(err), null);
            }
        }
    }

    /**
     * Logout
     * @param {boolean} clear_cache If true remove cookies and everything on this user in memory
     */
    public exit(): void {
        this.clearCookies();
        this.user = null;
        ly.Application.events.emit(constants.ONBUS_USER_OFF, false);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private getAccountRole(account: ModelAccount | null, company_id: string): ModelAccountRole | null {
        if (!!account && !!company_id) {
            const account_roles: Array<ModelAccountRole> = account.roles;
            // loop on account roles
            for (let i = 0; i < account_roles.length; i++) {
                if (account_roles[i].company_id === company_id) {
                    return account_roles[i];
                }
            }
        }
        return null;
    }

    private store(user: any) {
        if (!!user && !!user._key) {

            user.roles = user.roles || []; // ensure array

            // save locally in memory
            this.user = user;

            // save cookies
            cookies.create(COOKIE_USER_ID, user._key, this._cookies_timeout);
            cookies.create(COOKIE_USERNAME, user.auth.username, this._cookies_timeout);
            cookies.create(COOKIE_USER_LANG, user.lang, this._cookies_timeout);

            cookies.erase(COOKIE_COMPANY_ID);

            if (user.roles.length === 1) {
                this.company_id = user.roles[0]["company_id"];  // (emit events)
            }

            // set user lang into i18n controller
            ly.i18n.lang = user.lang;
        }
    }

    private clearCookies(): void {
        cookies.erase(COOKIE_USER_ID);
        cookies.erase(COOKIE_USERNAME);
        cookies.erase(COOKIE_USER_LANG);
        cookies.erase(COOKIE_COMPANY_ID);
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default AuthHelper;