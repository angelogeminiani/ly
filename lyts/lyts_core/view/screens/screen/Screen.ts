import console from "../../../commons/console";
import {Route} from "../../Router";
import PageController from "../../pages/PageController";


abstract class Screen
    extends PageController {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _params: any;
    private readonly _name: string;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(route: Route) {
        super(route.path);
        try {
            this._name = this.uid;
            if (!!route) {
                this._params = route.params;
                this._name = route.uid();
            }
        } catch (err) {
            console.error("Screen.constructor", err);
        }
    }

    protected abstract render(): string;

    protected abstract free(): void;

    protected ready(): void {
        super.ready();

    }

    public show(): void {
        this.paused = false;
        this.element.classRemove('hide');
    }

    public hide(): void {
        this.paused = true; // pause page controller
        this.element.classAdd('hide');
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public get name() {
        return this._name;
    }

    /**
     * Return url parameters if any
     */
    public get params() {
        return !!this._params ? this._params : false;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default Screen;