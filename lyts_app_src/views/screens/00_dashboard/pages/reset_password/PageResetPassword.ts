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
import constants from "../../../../../constants";


export default class PageResetPassword
    extends Page {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _fld_email: ElementWrapper;
    private readonly _btn_submit: ElementWrapper;
    private readonly _alert_box: ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route);

        this._fld_email = super.getFirst("#" + this.uid + "_fld_email");
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
            console.error("PageResetPassword.init()", err)
        }
    }

    private initListeners() {
        this._fld_email.addEventListener('focusout', this.onFocusOutEmail);
        this._btn_submit.addEventListener('click',this.onClickBtnSubmit);
    }

    private removeListeners(){
        this._fld_email.removeEventListener();
        this._btn_submit.removeEventListener();
    }

    private onClickBtnSubmit(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.doResetPassword(this._fld_email.value());
        return true;
    }

    private onFocusOutEmail(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.validateFields(this._fld_email.value());
        return true;
    }

    private validateFields(email: string) {
        if (!!email && ly.lang.isEmail(email)) {
            this._fld_email.classRemove("is-invalid");
            this._fld_email.classAdd("is-valid");
        } else {
            this._fld_email.classAdd("is-invalid");
            this._fld_email.classRemove("is-valid");
        }
    }

    private doResetPassword(email: string) {
        if (!!email && ly.lang.isEmail(email)) {
            ApplicationController.auth.resetPassword(email, (err, account) => {
                if (!!err) {
                    console.error("PageResetPassword.doResetPassword", err);
                    CompAlert.create({message: "" + err, timeout: 3000}).appendTo(this._alert_box);
                } else {
                    CompAlert.create(
                        {message: ly.i18n.get('PageResetPassword_password_reset'),mode:"alert-success", timeout: 10000}).appendTo(this._alert_box);
                }
            });
        } else {
            this.validateFields(email);
        }
    }
}