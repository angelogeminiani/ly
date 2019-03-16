import ly from "../../lyts/lyts_core/ly";
import console from "../../lyts/lyts_core/commons/console";
import ElementWrapper from "../../lyts/lyts_core/view/components/ElementWrapper";
import ScreenController from "../../lyts/lyts_core/view/screens/ScreenController";
import ApplicationController from "../core/ApplicationController";
import constants from "../constants";
import CompNavBar from "./components/navbar/CompNavBar";
import Screen from "../../lyts/lyts_core/view/screens/screen/Screen";
import ScreenDashboard from "./screens/00_dashboard/ScreenDashboard";
import PageLogin from "./screens/00_dashboard/pages/login/PageLogin";
import PageDashboard from "./screens/00_dashboard/pages/dashboard/PageDashboard";
import PageMaintenance from "./screens/00_dashboard/pages/maintenance/PageMaintenance";
import en from "../core/i18n/en";
import it from "../core/i18n/it";
import view from "./view";

export default class Main
    extends ScreenController {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _nav: ElementWrapper;
    private readonly _body: ElementWrapper;

    private _comp_nav_bar: CompNavBar;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super("");

        // set debug mode
        this.debugMode = constants.DEBUG_MODE;

        // customize console
        console.uid = constants.uid;

        // register screens
        super.register('/00_dashboard', ScreenDashboard);
        // super.register('/01_profile', ScreenProfile);
        // super.register('/02_manage_people', ScreenManagePeople);

        this._nav = super.getFirst("#" + this.uid + "_nav");
        this._body = super.getFirst("#" + this.uid + "_screens");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        try {
            //-- remove components --//
            this._comp_nav_bar.remove();

            //-- remove listeners --//
            ApplicationController.events.off(this);
        } finally {
            super.free();
        }
    }

    protected ready(): void {
        super.ready();
        this.init();
    }

    public show(): void {

    }

    public hide(): void {

    }

    public route(screen: Screen) {
        screen.appendTo(this._body);
    }

    public localize(): void {

        //-- load i18n dictionaries --//
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

            // nav bar
            this._comp_nav_bar = new CompNavBar();
            this._comp_nav_bar.appendTo(this._nav);

            // init listeners
            ApplicationController.events.on(this, constants.ONBUS_USER_OFF, this.gotoLoginPage);
            ApplicationController.events.on(this, constants.ONBUS_USER_ON, this.gotoDashboardPage);
            ApplicationController.events.on(this, constants.ONBUS_NETWORK_OFF, this.gotoMaintenancePage);
            ApplicationController.events.on(this, constants.ONBUS_NETWORK_ON, this.gotoDashboardPage);
        } catch (err) {
            console.error("Main.init()", err);
        }

    }

    // redirection function
    private gotoLoginPage(): void {
        ApplicationController.goto(PageLogin.ADDRESS);
    }

    private gotoDashboardPage(): void {
        ApplicationController.goto(PageDashboard.ADDRESS);
    }

    private gotoMaintenancePage(): void {
        ApplicationController.goto(PageMaintenance.ADDRESS);
    }
}