import Component from "../../../../lyts/lyts_core/view/components/Component";
import view from "./view";
import ElementWrapper from "../../../../lyts/lyts_core/view/components/ElementWrapper";
import ly from "../../../../lyts/lyts_core/ly";
import globals from "../../../globals";

type AlertParams = {
    message: string,
    mode?: string,
    timeout?: number
};

const MODE_DANGER: string = "alert-danger";
const MODE_WARNING: string = "alert-warning";
const MODE_SUCCESS: string = "alert-success";


class CompAlert
    extends Component {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _message: ElementWrapper;
    private readonly _btn_close: ElementWrapper;

    private readonly _params: AlertParams;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(params: AlertParams) {
        super();

        this._params = params;
        this._params.mode = params.mode || MODE_DANGER;
        this._params.timeout = params.timeout || 0;

        this._message = super.getFirst("#" + this.uid + "_message");
        this._btn_close = super.getFirst("#" + this.uid + "_btn_close");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }


    protected free(): void {
        // remove reference to native events
        this._btn_close.removeEventListener();
    }

    protected ready(): void {
        this.init();
    }

    public localize(): void {
        super.localize();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        // listeners
        this._btn_close.addEventListener("click", this.onClose);
        // message
        this._message.innerHTML = this._params.message;
        // mode
        this.element.classAdd(this._params.mode || MODE_DANGER);
        // timer
        if (!!this._params.timeout) {
            ly.lang.funcDelay(() => {
                this.onClose(null);
            }, this._params.timeout);
        }
    }


    private onClose(e: Event | null): void {
        globals.$("#" + this.uid).alert("close");
        ly.lang.funcDelay(() => {
            this.remove();
        }, 500);

    }

    // ------------------------------------------------------------------------
    //                      F A C T O R Y
    // ------------------------------------------------------------------------

    public static create(params: AlertParams): CompAlert {
        return new CompAlert(params);
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export {CompAlert, AlertParams};