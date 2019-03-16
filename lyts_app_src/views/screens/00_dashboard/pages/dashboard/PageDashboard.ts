import Page from "../../../../../../lyts/lyts_core/view/pages/page/Page";
import ElementWrapper from "../../../../../../lyts/lyts_core/view/components/ElementWrapper";
import {Route} from "../../../../../../lyts/lyts_core/view/Router";
import {Animate, AnimateEffect} from "../../../../../../lyts/lyts_core_style/styles/animate/Animate";
import console from "../../../../../../lyts/lyts_core/commons/console";
import ApplicationController from "../../../../../core/ApplicationController";
import ModelAccount from "../../../../../core/account/ModelAccount";
import Component from "../../../../../../lyts/lyts_core/view/components/Component";
import PageLogin from "../login/PageLogin";
import view from "./view";

class PageDashboard
    extends Page {


    public static ADDRESS: string = "/00_dashboard/dashboard";

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _content: ElementWrapper;
    private _app_icons: Array<Component>;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route);

        this._app_icons = [];
        this._content = super.getFirst("#" + this.uid + "_content");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        // release memory
        this.removeAppIcons();
    }

    protected ready(): void {
        ApplicationController.ready((context: any) => {
            if (!!context.account) {
                // logged
                this.init(context.account as ModelAccount);
            } else {
                // need login
                ApplicationController.goto(PageLogin.ADDRESS);
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
        super.localize();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private init(account: ModelAccount): void {
        try {
            /**
             * should do something here like to create a custom user dashboard with app icons
             */
        } catch (err) {
            console.error("PageDashboard.init()", err)
        }
    }

    private removeAppIcons(): void {
        if (!!this._app_icons) {
            this._app_icons.forEach((cmp) => {
                cmp.remove();
            });
            this._app_icons = [];
        }
    }


}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default PageDashboard;
