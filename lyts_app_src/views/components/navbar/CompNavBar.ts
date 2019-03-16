import Component from "../../../../lyts/lyts_core/view/components/Component";
import view from "./view";
import ElementWrapper from "../../../../lyts/lyts_core/view/components/ElementWrapper";
import CompNetwork from "./network/CompNetwork";
import CompNavBarAccount from "./user/CompNavBarUser";
import ApplicationController from "../../../core/ApplicationController";
import ly from "../../../../lyts/lyts_core/ly";

class CompNavBar
    extends Component {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    // fields
    private readonly _network_box: ElementWrapper;
    private readonly _user_box: ElementWrapper;

    private readonly _logo: ElementWrapper;

    // components
    private _network_cmp: CompNetwork;
    private _usep_cmp: CompNavBarAccount;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super();

        this._network_box = super.getFirst("#" + this.uid + "_network_box");
        this._user_box = super.getFirst("#" + this.uid + "_user_box");

        this._logo = super.getFirst("#" + this.uid + "_logo");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }


    protected free(): void {
        this.removeComponents();
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
        this.initComponents();
    }

    private initComponents(): void {
        // network
        this._network_cmp = new CompNetwork();
        this._network_cmp.appendTo(this._network_box);

        // user
        this._usep_cmp = new CompNavBarAccount();
        this._usep_cmp.appendTo(this._user_box);
    }

    private removeComponents(): void {
        // network
        if (!!this._network_cmp) {
            this._network_cmp.remove();
        }

        // user
        if (!!this._usep_cmp) {
            this._usep_cmp.remove();
        }
    }


}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default CompNavBar;