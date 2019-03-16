import Page from "../../../../../../lyts/lyts_core/view/pages/page/Page";
import ElementWrapper from "../../../../../../lyts/lyts_core/view/components/ElementWrapper";
import {Route} from "../../../../../../lyts/lyts_core/view/Router";
import view from "./view";
import {Animate, AnimateEffect} from "../../../../../../lyts/lyts_core_style/styles/animate/Animate";
import console from "../../../../../../lyts/lyts_core/commons/console";
import ly from "../../../../../../lyts/lyts_core/ly";
import it from "./i18n/it";
import en from "./i18n/en";
import ApplicationController from "../../../../../core/ApplicationController";
import {CompAlert} from "../../../../components/alert/CompAlert";
import constants from "../../../../../constants";


export default class PageRegister
    extends Page {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _fld_email: ElementWrapper;
    private readonly _fld_password: ElementWrapper;
    private readonly _fld_repassword: ElementWrapper;
    private readonly _fld_company_name: ElementWrapper;
    private readonly _fld_company_vat: ElementWrapper;
    private readonly _fld_company_address: ElementWrapper;
    private readonly _btn_submit: ElementWrapper;
    private readonly _alert_box: ElementWrapper;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route);

        this._fld_email = super.getFirst("#" + this.uid + "_fld_email");
        this._fld_password = super.getFirst("#" + this.uid + "_fld_password");
        this._fld_repassword = super.getFirst("#" + this.uid + "_fld_repassword");
        this._fld_company_name = super.getFirst("#" + this.uid + "_fld_company_name");
        this._fld_company_vat = super.getFirst("#" + this.uid + "_fld_company_vat");
        this._fld_company_address = super.getFirst("#" + this.uid + "_fld_company_address");
        this._btn_submit = super.getFirst("#" + this.uid + "_btn_submit");
        this._alert_box = super.getFirst("#" + this.uid + "_alert_box");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        // release memory
        this.removeListeners();

    }

    protected ready(): void {
        this.init();
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

    private init(): void {
        try {

            // listeners
            this.initListeners();

        } catch (err) {
            console.error("PageRegister.init()", err)
        }
    }

    private initListeners(): void {
        this._fld_email.addEventListener('focusout', this.onFocusOutEmail);
        this._fld_password.addEventListener('focusout', this.onFocusOutPassword);
        this._fld_repassword.addEventListener('change', this.onFocusOutRepassword);
        this._fld_company_name.addEventListener('focusout', this.onFocusOutCompanyName);
        this._fld_company_vat.addEventListener('focusout', this.onFocusOutCompanyVat);
        this._fld_company_address.addEventListener('focusout', this.onFocusOutCompanyAddress);
        this._btn_submit.addEventListener('click', this.onClickBtnSubmit);
    }

    private removeListeners(): void {
        this._fld_email.removeEventListener();
        this._fld_password.removeEventListener();
        this._fld_repassword.removeEventListener();
        this._fld_company_name.removeEventListener();
        this._fld_company_vat.removeEventListener();
        this._fld_company_address.removeEventListener();
        this._btn_submit.removeEventListener();
    }

    private onClickBtnSubmit(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.doRegister(this._fld_email.value(), this._fld_password.value(), this._fld_repassword.value(),
            this._fld_company_name.value(), this._fld_company_vat.value(), this._fld_company_address.value());
        return true;
    }

    private onFocusOutEmail(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields();
        return true;
    }

    private onFocusOutPassword(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields();
        return true;
    }

    private onFocusOutRepassword(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields();
        return true;
    }

    private onFocusOutCompanyName(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields();
        return true;
    }

    private onFocusOutCompanyVat(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields();
        return true;
    }

    private onFocusOutCompanyAddress(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields();
        return true;
    }

    private validateFields() {
        this.validateLoginFields(
            this._fld_email.value(), this._fld_password.value(), this._fld_repassword.value());
        this.validateBillingFields(
            this._fld_company_name.value(), this._fld_company_vat.value(), this._fld_company_address.value());

    }

    private validateLoginFields(email: string, password: string, repassword: string) {

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

        if (!!repassword) {
            this._fld_repassword.classRemove("is-invalid");
            this._fld_repassword.classAdd("is-valid");
        } else {
            this._fld_repassword.classAdd("is-invalid");
            this._fld_repassword.classRemove("is-valid");
        }

        if (!!password && !!repassword && password != repassword) {
            this._fld_password.classAdd("is-invalid");
            this._fld_password.classRemove("is-valid");
            this._fld_repassword.classAdd("is-invalid");
            this._fld_repassword.classRemove("is-valid");
        }
    }

    private validateBillingFields(company_name: string, company_vat: string, company_address: string) {
        if (!!company_name) {
            this._fld_company_name.classRemove("is-invalid");
            this._fld_company_name.classAdd("is-valid");
        } else {
            this._fld_company_name.classAdd("is-invalid");
            this._fld_company_name.classRemove("is-valid");
        }

        if (!!company_vat) {
            this._fld_company_vat.classRemove("is-invalid");
            this._fld_company_vat.classAdd("is-valid");
        } else {
            this._fld_company_vat.classAdd("is-invalid");
            this._fld_company_vat.classRemove("is-valid");
        }

        if (!!company_address) {
            this._fld_company_address.classRemove("is-invalid");
            this._fld_company_address.classAdd("is-valid");
        } else {
            this._fld_company_address.classAdd("is-invalid");
            this._fld_company_address.classRemove("is-valid");
        }
    }

    private doRegister(email: string, password: string, repassword: string,
                       company_name: string, company_vat: string, company_address: string) {
        if (!!email && ly.lang.isEmail(email) && !!password && !!repassword && password === repassword
            && !!company_name && !!company_vat && !!company_address) {
            ApplicationController.auth.register(email, password,
                company_name, company_vat, company_address, (err, account) => {
                    if (!!err) {
                        console.error("PageRegister.doRegister", err);
                        CompAlert.create({message: "" + err, timeout: 3000}).appendTo(this._alert_box);
                    }
                });
        } else {
            this.validateFields();
        }
    }


}