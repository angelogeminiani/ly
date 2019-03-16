import Page from "../../../../../../lyts/lyts_core/view/pages/page/Page";
import ElementWrapper from "../../../../../../lyts/lyts_core/view/components/ElementWrapper";
import {Route} from "../../../../../../lyts/lyts_core/view/Router";
import view from "./view";
import {Animate, AnimateEffect} from "../../../../../../lyts/lyts_core_style/styles/animate/Animate";
import console from "../../../../../../lyts/lyts_core/commons/console";
import ly from "../../../../../../lyts/lyts_core/ly";
import en from "./i18n/en";
import it from "./i18n/it";
import ApplicationController from "../../../../../core/ApplicationController";
import {CompAlert} from "../../../../components/alert/CompAlert";
import ModelAccount, {ModelAccountRole} from "../../../../../core/account/ModelAccount";
import AccountService from "../../../../../core/account/AccountService";
import {Listener} from "../../../../../../lyts/lyts_core/commons/events/Events";
import errors from "../../../../../core/utils/errors";
import CompCompanyItem from "./components/CompCompanyItem";
import constants from "../../../../../constants";


class PageLogin
    extends Page {

    public static ADDRESS = "/00_dashboard/login/null/null";

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    // STEP 1
    private readonly _step_1: ElementWrapper;
    private readonly _fld_email: ElementWrapper;
    private readonly _fld_password: ElementWrapper;
    private readonly _fld_rememberme: ElementWrapper;
    private readonly _btn_submit: ElementWrapper;
    private readonly _alert_box: ElementWrapper;

    // STEP 2
    private readonly _step_2: ElementWrapper;
    private readonly _companies_box: ElementWrapper;

    private _companies_cmp: Array<CompCompanyItem>;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route);

        this._companies_cmp = new Array<CompCompanyItem>();

        // STEP 1
        this._step_1 = super.getFirst("#" + this.uid + "_step_1");
        this._fld_email = super.getFirst("#" + this.uid + "_fld_email");
        this._fld_password = super.getFirst("#" + this.uid + "_fld_password");
        this._fld_rememberme = super.getFirst("#" + this.uid + "_fld_rememberme");
        this._btn_submit = super.getFirst("#" + this.uid + "_btn_submit");
        this._alert_box = super.getFirst("#" + this.uid + "_alert_box");

        // STEP 2
        this._step_2 = super.getFirst("#" + this.uid + "_step_2");
        this._companies_box = super.getFirst("#" + this.uid + "_companies_box");


    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        // remove listeners
        this._fld_email.removeEventListener();
        this._fld_password.removeEventListener();
        this._fld_rememberme.removeEventListener();
        this._btn_submit.removeEventListener();
        // remove components
        this.removeComponents();
    }

    protected ready(): void {
        ApplicationController.ready((context: any) => {
            var account = ApplicationController.auth.user;
            var company_id = ApplicationController.auth.company_id;
            if (!!company_id) {
                // logged
                // ApplicationController.goto(constants.REDIR_DASHBOARD);
            } else {
                // need login?
                if (!!account) {
                    // step-2: ask for company id
                    this.initStep2();
                } else {
                    // step-1: simple login
                    this.initStep1();
                }
            }
        });
    }

    public show(): void {
        super.show();
        Animate.apply(AnimateEffect.fadeIn, this.element, () => {


        });
    }

    public hide(): void {
        super.hide();
    }

    public localize(): void {

        ly.i18n.registerDefault(it);
        ly.i18n.register("en", en);
        ly.i18n.register("it", it);

        super.localize();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private initStep1(): void {
        try {
            this._step_2.classAdd(constants.CLASS_HIDDEN);
            this._step_1.classRemove(constants.CLASS_HIDDEN);
            Animate.apply(AnimateEffect.fadeIn, this._step_1, () => {
            });

            // listeners
            this._fld_email.addEventListener('focusout', this.onFocusOutEmail);
            this._fld_password.addEventListener('focusout', this.onFocusOutPassword);
            this._fld_rememberme.addEventListener('change', this.onChangeRememberme);
            this._btn_submit.addEventListener('click', this.onClickBtnSubmit);

            // assign default value
            this._fld_rememberme.value(true);
        } catch (err) {
            console.error("PageLogin.initStep1()", err);
        }
    }

    private initStep2(): void {
        try {
            // remove components
            this.removeComponents();
            // ask for companies
            var roles: Array<ModelAccountRole> = !!ApplicationController.auth.user ? ApplicationController.auth.user.roles : [];
            if (roles.length > 0) {
                var company_ids: Array<string> = [];
                roles.forEach((role) => {
                    company_ids.push(role.company_id);
                });
                // ready for query (call service)
                this.getCompanies(company_ids, (companies) => {
                    if (!!companies) {
                        // create company components
                        companies.forEach((company: ModelAccount) => {
                            const cmp: CompCompanyItem = new CompCompanyItem(company);
                            cmp.on(this, CompCompanyItem.ON_ENTER, this.onEnterCompanyItem);
                            cmp.appendTo(this._companies_box);
                            this._companies_cmp.push(cmp);

                            this._step_1.classAdd(constants.CLASS_HIDDEN);
                            this._step_2.classRemove(constants.CLASS_HIDDEN);
                            Animate.apply(AnimateEffect.fadeIn, this._step_2, () => {
                            });

                        });
                    }
                });

            } else {
                console.error("PageLogin.initStep2()", "Inconsistent data in account: roles cannot be empty.");
            }
        } catch (err) {
            console.error("PageLogin.initStep2()", err)
        }
    }

    private removeComponents(): void {
        if (!!this._companies_cmp) {
            this._companies_cmp.forEach((cmp) => {
                cmp.remove();
            });
            this._companies_cmp = [];
        }
    }

    private onClickBtnSubmit(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.doLogin(this._fld_email.value(), this._fld_password.value());
        return true;
    }

    private onFocusOutEmail(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields(this._fld_email.value(), this._fld_password.value());
        return true;
    }

    private onFocusOutPassword(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields(this._fld_email.value(), this._fld_password.value());
        return true;
    }

    private onChangeRememberme(e: Event) {
        e.stopPropagation();
        e.preventDefault();

        ApplicationController.auth.cookies_timeout = -1;
        if (this._fld_rememberme.value()) {
            ApplicationController.auth.cookies_timeout = 20;
        }

        return true;
    }

    private onEnterCompanyItem(company_id: string): void {
        if (!!company_id) {
            ApplicationController.auth.company_id = company_id;
        }
    }

    private validateFields(email: string, password: string) {
        if (!!email && ly.lang.isEmail(email)) {
            this._fld_email.classRemove("is-invalid");
            this._fld_email.classAdd("is-valid");
        } else {
            this._fld_email.classAdd("is-invalid");
            this._fld_email.classRemove("is-valid");
        }

        if (!!password) {
            this._fld_password.classRemove("is-invalid");
            this._fld_password.classAdd("is-valid");
        } else {
            this._fld_password.classAdd("is-invalid");
            this._fld_password.classRemove("is-valid");
        }
    }

    private doLogin(email: string, password: string) {
        if (!!email && !!password) {
            ApplicationController.auth.authenticate(email, password, (err, account) => {
                if (!!err) {
                    console.error("PageLogin.doLogin", err);
                    CompAlert.create({message: "" + err, timeout: 3000}).appendTo(this._alert_box);
                } else {
                    const company_id: string = ApplicationController.auth.company_id;
                    if (!company_id) {
                        this.initStep2();
                    }
                }
            });
        } else {
            this.validateFields(email, password);
        }
    }

    private getCompanies(company_ids: Array<string>, callback: Listener): void {
        const srvc_account: AccountService = new AccountService();
        srvc_account.get_accounts_by_id(company_ids, (err, response) => {
            if (!!err) {
                console.error("PageLogin.getCompanies", err);
                CompAlert.create({message: "" + errors.getMessage(err), timeout: 3000}).appendTo(this._alert_box);
                ly.lang.funcInvoke(callback, false);
            } else {
                ly.lang.funcInvoke(callback, response);
            }
        });
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default PageLogin;