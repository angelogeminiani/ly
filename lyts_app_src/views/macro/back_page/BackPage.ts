import Page from "../../../../lyts/lyts_core/view/pages/page/Page";
import {Route} from "../../../../lyts/lyts_core/view/Router";
import view from "./view";
import ElementWrapper from "../../../../lyts/lyts_core/view/components/ElementWrapper";

abstract class BackPage
    extends Page {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    private readonly _btn_back:ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    constructor(route: Route) {
        super(route);

        this._btn_back = super.getFirst("#" + this.uid + "_btn_back");
    }

    protected abstract back(): void;

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------
    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        // remove listeners
        this._btn_back.removeEventListener();
    }

    protected ready(): void {
        this._btn_back.addEventListener("click",this.onClickBtnBack);
    }


    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private onClickBtnBack(e:Event):void{
        e.preventDefault();
        e.stopPropagation();
        this.back();
    }

}

export default BackPage;