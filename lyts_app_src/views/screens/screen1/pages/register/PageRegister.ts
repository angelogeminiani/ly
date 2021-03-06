import Page from "../../../../../../lyts/lyts_core/view/pages/page/Page";
import ElementWrapper from "../../../../../../lyts/lyts_core/view/components/ElementWrapper";
import {Route} from "../../../../../../lyts/lyts_core/view/Router";
import view from "./view";
import {Animate, AnimateEffect} from "../../../../../../lyts/lyts_core_style/styles/animate/Animate";
import console from "../../../../../../lyts/lyts_core/commons/console";


export default class PageRegister
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

        console.log("REMOVED PAGEREGISTER:", this.uid);
    }

    protected ready(): void {
        this.init();
    }

    public show(): void {
        super.show();
        Animate.apply(AnimateEffect.fadeIn, this.element, () => {
            console.log('PageRegister.show', AnimateEffect.bouce + ' animation terminated');
        });
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
            console.error("PageRegister.init()", err)
        }
    }


}