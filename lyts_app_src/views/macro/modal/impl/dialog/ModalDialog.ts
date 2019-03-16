import ly from "../../../../../../lyts/lyts_core/ly";
import BaseModal, {ModalCallback} from "../../BaseModal";
import view from "./view";
import it from "./i18n/it";
import en from "./i18n/en";
import ElementWrapper from "../../../../../../lyts/lyts_core/view/components/ElementWrapper";

class ModalDialog
    extends BaseModal {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _message: ElementWrapper;
    private readonly _btn_confirm: ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super();

        this._message = super.getFirst("#" + this.uid + "_message");
        this._btn_confirm = super.getFirst("#" + this.uid + "_btn_confirm");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        try {
            this._btn_confirm.removeEventListener();
        } finally {
            super.free();
        }
    }

    protected ready(): void {
        super.ready();
        this.init();
    }

    public open(callback: ModalCallback): void {
        super.open(callback);
    }

    public localize(): void {

        ly.i18n.registerDefault(it);
        ly.i18n.register("en", en);
        ly.i18n.register("it", it);

        super.localize();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public get message(): string {
        if (!!this._message) {
            return this._message.value();
        }
        return "";
    }

    public set message(value: string) {
        if (!!this._message) {
            this._message.value(value);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        this._btn_confirm.onClick(this.onConfirm, this);
    }

    private onConfirm(e: Event): void {
        // do not prevent default. Let super class handle this
        super.invoke({
            target_id: "btn_confirm",
            data: true
        });
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default ModalDialog;