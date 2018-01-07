import Page from "../../../../../../lyts_core/view/pages/page/Page";
import ElementWrapper from "../../../../../../lyts_core/view/components/ElementWrapper";
import {Route} from "../../../../../../lyts_core/view/Router";
import view from "./view";


export default class PageLogin
    extends Page {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _content: ElementWrapper;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route);

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

        console.log("REMOVED PAGELOGIN:", this.uid);
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


        } catch (err) {
            console.error("PageLogin.init()", err)
        }
    }


}