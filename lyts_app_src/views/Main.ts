import view from "./MainView";
import console from "../../lyts/lyts_core/commons/console";
import constants from "../constants";
import ElementWrapper from "../../lyts/lyts_core/view/components/ElementWrapper";
import ly from "../../lyts/lyts_core/ly";
import en from "../core/i18n/en";
import it from "../core/i18n/it";
import ScreenController from "../../lyts/lyts_core/view/screens/ScreenController";
import Screen1 from "./screens/screen1/Screen1";
import Screen2 from "./screens/screen2/Screen2";
import Screen from "../../lyts/lyts_core/view/screens/screen/Screen";


export default class Main
    extends ScreenController {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _body: ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super("");

        // set debug mode
        this.debugMode = true;

        // customize console
        console.uid = constants.uid;

        // register screens
        super.register('/screen1', Screen1);
        super.register('/screen2', Screen2);

        this._body = super.getFirst("#" + this.uid + "_screens");
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

        console.log("REMOVED MAIN: ", constants.uid);
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