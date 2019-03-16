import view from "./view";
import ly from "../../../../../../../lyts/lyts_core/ly";
import it from "./i18n/it";
import en from "./i18n/en";
import Component from "../../../../../../../lyts/lyts_core/view/components/Component";
import ElementWrapper from "../../../../../../../lyts/lyts_core/view/components/ElementWrapper";
import ModelAccount from "../../../../../../core/account/ModelAccount";


export default class CompCompanyItem extends Component {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------
    public static readonly ON_ENTER: string = "on_enter";

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    private readonly _fld_name: ElementWrapper;
    private readonly _btn_enter: ElementWrapper;

    private _model: ModelAccount;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    constructor(model: ModelAccount) {
        super();

        this._model = model;

        this._fld_name = super.getFirst("#" + this.uid + "_fld_name");
        this._btn_enter = super.getFirst("#" + this.uid + "_btn_enter");

    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }


    protected free(): void {
        // remove listeners
        this._btn_enter.removeEventListener();
    }

    protected ready(): void {
        this.init();
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


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private init(): void {
        // init listeners
        this._btn_enter.addEventListener('click', this.onClickBtnEnter);
        // set view
        this._fld_name.value(!!this._model ? this._model.company.name : "");

    }


    private onClickBtnEnter(e: Event): void {
        e.preventDefault();
        e.stopPropagation();

        if (!!this._model) {
            super.emit(CompCompanyItem.ON_ENTER,this._model._key);
        }
    }


}