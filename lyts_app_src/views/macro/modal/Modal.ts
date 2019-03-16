import BaseObject from "../../../../lyts/lyts_core/commons/BaseObject";
import BaseModal from "./BaseModal";
import globals from "../../../globals";
import ly from "../../../../lyts/lyts_core/ly";

const DEF_OPTIONS = {
    show: true,  // Shows the modal when initialized.
    focus: true, // Puts the focus on the modal when initialized.
    keyboard: true, // Closes the modal when escape key is pressed
    backdrop: true, // boolean or the string 'static' - Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.

};

class Modal
    extends BaseObject {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    private readonly _app_modal: string = "#_app_modal";
    private readonly _app_modal_content: string = "#_app_modal_content";

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _child: BaseModal | null;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super();

        this.init();
    }


    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public open(child: BaseModal, options?: any): void {
        this.close();
        if (!!child) {
            this._child = child;
            child.appendTo(this._app_modal_content);

            options = options || DEF_OPTIONS;

            // show
            globals.$(this._app_modal).modal(options)
        }
    }

    public close(): void {
        if (!!this._child) {
            this._child.remove();
            this._child = null;
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        const _self: any = this;
        globals.$(this._app_modal).on('hidden.bs.modal', function (e: Event) {
            _self.close();
        });
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: Modal;

    public static instance(): Modal {
        if (null == Modal.__instance) {
            Modal.__instance = new Modal();
        }
        return Modal.__instance;
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default Modal.instance();