import Component from "../../../../../lyts/lyts_core/view/components/Component";
import view from "./view";
import ElementWrapper from "../../../../../lyts/lyts_core/view/components/ElementWrapper";
import ly from "../../../../../lyts/lyts_core/ly";
import constants from "../../../../constants";
import ModelAccount from "../../../../core/account/ModelAccount";
import ApplicationController from "../../../../core/ApplicationController";
import globals from "../../../../globals";
import AccountService from "../../../../core/account/AccountService";

const DEFAULT_IMAGE: string = constants.IMAGE_USER;

class CompNavBarUser
    extends Component {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _dropdown: ElementWrapper;
    private readonly _fld_name: ElementWrapper;
    private readonly _fld_role_name: ElementWrapper;
    private readonly _fld_company: ElementWrapper;
    private readonly _fld_signature: ElementWrapper;
    private readonly _image: ElementWrapper;
    private readonly _btn_exit: ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super();

        this._dropdown = super.getFirst("#" + this.uid + "_dropdown");
        this._fld_name = super.getFirst("#" + this.uid + "_fld_name");
        this._fld_role_name = super.getFirst("#" + this.uid + "_fld_role_name");
        this._fld_company = super.getFirst("#" + this.uid + "_fld_company");
        this._fld_signature = super.getFirst("#" + this.uid + "_fld_signature");
        this._image = super.getFirst("#" + this.uid + "_image");
        this._btn_exit = super.getFirst("#" + this.uid + "_btn_exit");
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }


    protected free(): void {
        // remove listeners
        ApplicationController.events.off(this);

        this._btn_exit.removeEventListener();
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
        // init listeners
        ApplicationController.events.on(this, constants.ONBUS_USER_OFF, this.onUserOff);
        ApplicationController.events.on(this, constants.ONBUS_USER_ON, this.onUserOn);
        ApplicationController.events.on(this, constants.ONBUS_USER_IMAGE, this.onUserImage);

        this._btn_exit.onClick(this.onClickExit, this);

        ApplicationController.ready((context: any) => {
            if (!!context.account) {
                this.setUser(context.account)
            }
        });
    }

    private onUserOn(user: ModelAccount): void {
        this.setUser(user);
    }

    private onUserOff(): void {
        this._fld_name.value("");
        this._fld_role_name.value("");

        this._dropdown.classAdd(constants.CLASS_HIDDEN);
        this._image.setAttribute("src", DEFAULT_IMAGE);
    }

    private onUserImage(user: ModelAccount): void {
        this.setUserImage(user);
    }

    private setUser(account: ModelAccount): void {
        if (!!account && !!account.current_role) {
            const user_id: string = account._key;
            const role_name: string = account.current_role.role_name;
            const company_id: string = account.current_role.company_id;
            const name: string = ((ly.objects.get(account, "person.name") || "") + " " + (ly.objects.get(account, "person.surname") || "")).trim();
            const image: string = ly.objects.get(account, "person.image") || DEFAULT_IMAGE;

            this.getCompany(company_id, (err: any, response: Array<any>) => {
                if (!!err) {
                    ly.console.error("CompNavBarUser.setUser", err);
                } else {
                    const company: string = ly.objects.get(response[0], "company.name") || "---------";
                    this._fld_name.value(name);
                    this._fld_role_name.value(role_name);
                    this._fld_company.value(company);
                    this._fld_signature.value("(" + user_id + ")");
                    this._image.setAttribute("src", image);

                    this._dropdown.classRemove(constants.CLASS_HIDDEN);
                }
            });
        }
    }

    private setUserImage(account: ModelAccount): void {
        const image: string = ly.objects.get(account, "person.image") || DEFAULT_IMAGE;
        this._image.setAttribute("src", image);
    }

    private getCompany(company_id: string, callback: Function): void {
        AccountService.instance().get_account(company_id, (err: any, response: Array<any>) => {
            callback.call(this, err, response);
        });
    }

    private onClickExit(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        ApplicationController.auth.exit();
        globals.$(this._dropdown).dropdown('toggle');
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default CompNavBarUser;