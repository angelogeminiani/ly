import Component from "../../../../lyts/lyts_core/view/components/Component";
import ElementWrapper from "../../../../lyts/lyts_core/view/components/ElementWrapper";
import view from "./view";
import Modal from "./Modal";


interface ModalResponse {

    target_id: string;
    data: any;

}

type ModalCallback = (response: ModalResponse | undefined) => void;

abstract class BaseModal
    extends Component {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _title: ElementWrapper;
    private readonly _body: ElementWrapper;
    private readonly _btn_close: ElementWrapper;
    private readonly _btn_undo: ElementWrapper;


    private _callback: ModalCallback | null;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super();

        this._callback = null;

        this._title = super.getFirst("#" + this.uid + "_title");
        this._body = super.getFirst("#" + this.uid + "_body");
        this._btn_close = super.getFirst("#" + this.uid + "_btn_close");
        this._btn_undo = super.getFirst("#" + this.uid + "_btn_undo");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        if (!!this._btn_close) {
            this._btn_close.removeEventListener();
        }
        if (!!this._btn_undo) {
            this._btn_undo.removeEventListener();
        }
    }

    protected ready(): void {
        this._init();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public set title(value: string) {
        if (!!this._title) {
            this._title.value(value);
        }
    }

    public get title(): string {
        if (!!this._title) {
            return this._title.value();
        }
        return "";
    }

    public get body(): ElementWrapper {
        return this._body;
    }

    public open(callback: ModalCallback): void {
        this._callback = callback;
        Modal.open(this);
    }

    // ------------------------------------------------------------------------
    //                      p r o t e c t e d
    // ------------------------------------------------------------------------

    protected invoke(params?: ModalResponse): void {
        if (!!this._callback) {
            this._callback(params);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private _init(): void {
        if (!!this._btn_close) {
            this._btn_close.onClick(this._onClose, this);
        }
        if (!!this._btn_undo) {
            this._btn_undo.onClick(this._onClose, this);
        }
    }


    private _onClose(e: Event): void {
        const elem: HTMLElement = e.target as HTMLElement;
        if (!!elem) {
            this.invoke({
                target_id: elem.getAttribute("id") || "btn_close",
                data: null
            });
        }
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default BaseModal;
export {ModalResponse, ModalCallback};