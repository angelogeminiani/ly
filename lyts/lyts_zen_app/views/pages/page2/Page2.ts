import Page from "../../../../lyts_core/view/components/page/Page";
import ElementWrapper from "../../../../lyts_core/view/components/ElementWrapper";
import console from "../../../../lyts_core/commons/console";
import view from "./view";
import {Route} from "../../../../lyts_core/view/routing/Router";


export default class Page2
    extends Page {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _content: ElementWrapper;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route:Route) {
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

        console.log("REMOVED:", this.uid);
    }

    protected ready(): void {
        this.init();
    }

    public show(): void {
        //super.show();
        this.element.classAdd('animated');
        this.element.classAdd('fadeIn');
    }

    public hide(): void {
        super.hide();
        this.element.classRemove('fadeIn');
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
            console.error("Page2.init()", err)
        }
    }


}