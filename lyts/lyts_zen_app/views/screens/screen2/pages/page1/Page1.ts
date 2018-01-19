import ElementWrapper from "../../../../../../lyts_core/view/components/ElementWrapper";
import {Route} from "../../../../../../lyts_core/view/Router";
import view from "./view";
import Page from "../../../../../../lyts_core/view/pages/page/Page";
import ly from "../../../../../../lyts_core/ly";
import console from "../../../../../../lyts_core/commons/console";


export default class Page1
    extends Page {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _button: ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route);

        this._button = super.getFirst("#" + this.uid + "_button");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        // release memory
        this._button.removeEventListener();

        console.log("REMOVED:", this.uid);
    }

    protected ready(): void {
        this.init();
    }

    public show(): void {
        super.show();

    }

    public hide(): void {
        super.hide();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        try {

            this._button.addEventListener('click', this.onButtonClick);

        } catch (err) {
            console.error("Page1.init()", err)
        }
    }

    private onButtonClick(ev: Event) {
        try{
            ev.preventDefault();
            console.log("Page1.onButtonClick", "DEBOUNCING 'this.doLogAction'");
            ly.lang.funcDebounce(this, this.doLogAction, 1000, false, ev);
        }catch(err){
            console.error("Page1.onButtonClick", err);
        }
    }

    private doLogAction(param: any) {
        console.log("Page1.doLogAction", param);
    }
}