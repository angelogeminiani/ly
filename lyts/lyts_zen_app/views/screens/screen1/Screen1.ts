import ElementWrapper from "../../../../lyts_core/view/components/ElementWrapper";
import console from "../../../../lyts_core/commons/console";
import view from "./view";
import {Route} from "../../../../lyts_core/view/Router";
import {Animate, AnimateEffect} from "../../../../lyts_core_style/styles/animate/Animate";
import Screen from "../../../../lyts_core/view/screens/screen/Screen";
import Page from "../../../../lyts_core/view/pages/page/Page";
import PageLogin from "./pages/login/PageLogin";
import PageRegister from "./pages/register/PageRegister";


export default class Screen1
    extends Screen {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _pages: ElementWrapper;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(root:string, route:Route) {
        super(root, route);

        this.debugMode = true;

        // register internal screen pages
        super.register('/login', PageLogin);
        super.register('/register', PageRegister);

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

        console.log("REMOVED SCREEN1:", this.uid);
    }

    protected ready(): void {
        super.ready();

        this.init();
    }

    public show(): void {
        super.show();
        Animate.apply(AnimateEffect.slideInDown, this.element, () => {
            console.log('Screen1.show', AnimateEffect.bouce + ' animation terminated');
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
            console.error("Screen1.init()", err)
        }
    }


}