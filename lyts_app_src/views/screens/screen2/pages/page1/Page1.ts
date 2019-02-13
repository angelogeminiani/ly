import ElementWrapper from "../../../../../../lyts/lyts_core/view/components/ElementWrapper";
import {Route} from "../../../../../../lyts/lyts_core/view/Router";
import view from "./view";
import Page from "../../../../../../lyts/lyts_core/view/pages/page/Page";
import ly from "../../../../../../lyts/lyts_core/ly";
import console from "../../../../../../lyts/lyts_core/commons/console";
import DomCollection from "../../../../../../lyts/lyts_core/commons/storage/DomCollection";


export default class Page1
    extends Page {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _button: ElementWrapper;
    private readonly _image: ElementWrapper;

    private readonly _dom_collection: DomCollection;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route);

        this._button = super.getFirst("#" + this.uid + "_button");
        this._image = super.getFirst("#" + this.uid + "_image");

        this._dom_collection = new DomCollection("images");
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

            // call debounced function
            this._button.addEventListener('click', ly.lang.funcDebounce(this, this.onButtonClick, 1000, true, 'param1'));

        } catch (err) {
            console.error("Page1.init()", err)
        }
    }

    private onButtonClick(ev: Event, param1: string) {
        ev.preventDefault();
        console.log("Page1.doLogAction", ev, param1);

        ly.dom.ready(function () {
            const len: number = this._dom_collection.length;
            console.log('Page1.init', 'DomCollection length', len);
            if (len > 0) {
                const item: any = this._dom_collection.get("IMG_USER");
                const src:string = item.value;
                if(!!src){
                    this._image.setAttribute('src', src);
                } else {
                    console.warn('Page1.init()', 'item', item);
                }
            }
        }, this);
    }
}