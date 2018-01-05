import view from "./MainView";
import console from "../../lyts_core/commons/console";
import constants from "../constants";
import ElementWrapper from "../../lyts_core/view/components/ElementWrapper";
import ly from "../../lyts_core/ly";
import en from "../model/i18n/en";
import it from "../model/i18n/it";
import PageController from "../../lyts_core/view/routing/PageController";
import Page1 from "./pages/page1/Page1";
import Page2 from "./pages/page2/Page2";
import Page from "../../lyts_core/view/components/page/Page";
import {StyleManager, StyleModule} from "../../lyts_core_style/StyleManager";


export default class Main
    extends PageController {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _body: ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super("");

        // customize console
        console.uid = constants.uid;

        // initialize Style Manager
        StyleManager.inject(
            {},
            StyleModule.animate
        );

        // register pages
        super.register('/page1', Page1);
        super.register('/page2/:param1/:param2', Page2);
        super.register('/page3/:param1/not_a_param', Page2);
        super.register('/call', (args: any) => {
            console.log("CALLBACK", "Hello from a callback", args);
        });

        this._body = super.getFirst("#" + this.uid + "_pages");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        super.free();
        // release memory

        console.log("REMOVED: ", constants.uid);
    }

    protected ready(): void {
        super.ready();

        this.init();
    }

    public show(): void {

    }

    public hide(): void {

    }

    public route(page: Page) {
        page.appendTo(this._body);
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {

        try {
            // App localizations
            this.initI18n();

            // event handlers
            this.initHandlers();


        } catch (err) {
            console.error("Main.init()", err)
        }

    }

    private initI18n(): void {
        //-- load i18n dictionaries --//
        ly.i18n.registerDefault(en);
        ly.i18n.register("en", en);
        ly.i18n.register("it", it);

    }

    private initHandlers(): void {

    }


}