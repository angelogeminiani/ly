import view from "./MainView";
import Component from "../../lyts_core/view/components/Component";
import console from "../../lyts_core/commons/console";
import constants from "../constants";
import ElementWrapper from "../../lyts_core/view/components/ElementWrapper";
import ly from "../../lyts_core/ly";
import en from "../model/i18n/en";
import it from "../model/i18n/it";


export default class Main
    extends Component {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _content: ElementWrapper;
    private readonly _loader: ElementWrapper;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super();

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

        console.log("REMOVED: ", constants.uid);
    }

    protected ready(): void {
        this.init();
    }

    public show(): void {

    }

    public hide(): void {

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

            // customize console
            console.uid = constants.uid;

        } catch (err) {
            console.error("Main.init()", err)
        } finally {
            // hide loader
            this._loader.classAdd('hidden');
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