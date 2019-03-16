import ElementWrapper from "../../../../lyts/lyts_core/view/components/ElementWrapper";
import console from "../../../../lyts/lyts_core/commons/console";
import view from "./view";
import {Route} from "../../../../lyts/lyts_core/view/Router";
import {Animate, AnimateEffect} from "../../../../lyts/lyts_core_style/styles/animate/Animate";
import Screen from "../../../../lyts/lyts_core/view/screens/screen/Screen";
import Page from "../../../../lyts/lyts_core/view/pages/page/Page";
import PageLogin from "./pages/login/PageLogin";
import PageRegister from "./pages/register/PageRegister";
import PageDashboard from "./pages/dashboard/PageDashboard";
import PageResetPassword from "./pages/reset_password/PageResetPassword";
import PageMaintenance from "./pages/maintenance/PageMaintenance";


export default class ScreenDashboard
    extends Screen {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _pages: ElementWrapper;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(root: string, route: Route) {
        super(root, route);

        this.debugMode = false;

        // register internal screen pages
        super.register('/dashboard', PageDashboard);
        super.register('/login/:username/:password', PageLogin);
        super.register('/register', PageRegister);
        super.register('/reset_password', PageResetPassword);
        super.register('/maintenance', PageMaintenance);

        this._pages = super.getFirst("#" + this.uid + "_pages");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected route(page: Page): void {
        page.appendTo(this._pages);
    }

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        // release memory

    }

    protected ready(): void {
        super.ready();
        this.init();
    }

    public show(): void {
        super.show();
        Animate.apply(AnimateEffect.slideInDown, this.element, () => {
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

    private init(): void {
        try {

        } catch (err) {
            console.error("ScreenDashboard.init()", err)
        }
    }


}