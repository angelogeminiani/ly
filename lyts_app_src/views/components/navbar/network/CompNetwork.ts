import Component from "../../../../../lyts/lyts_core/view/components/Component";
import view from "./view";
import NetworkService from "../../../../core/network/NetworkService";
import console from "../../../../../lyts/lyts_core/commons/console";
import ly from "../../../../../lyts/lyts_core/ly";
import ApplicationController from "../../../../core/ApplicationController";
import ElementWrapper from "../../../../../lyts/lyts_core/view/components/ElementWrapper";
import globals from "../../../../globals";
import constants from "../../../../constants";
import it from "./i18n/it";
import en from "./i18n/en";

const DELAY: number = 10000;
const status: any = {
    CONNECTED: "power",
    NOT_CONNECTED: "power_off"
};

export default class CompNetwork extends Component {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    private readonly _fld_icon: ElementWrapper;
    private readonly _fld_info: ElementWrapper;

    private _srvc_network: NetworkService;
    private _client_version: string;
    private _server_version: string;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    constructor() {
        super();

        this._fld_icon = super.getFirst("#" + this.uid + "_fld_icon");
        this._fld_info = super.getFirst("#" + this.uid + "_fld_info");
        this._srvc_network = new NetworkService();

        this._client_version = constants.version;
        this._server_version = "";
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {});
    }


    protected free(): void {

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
        this.initPopover();
        this.getServerVersion();
        // get server loop function
        ly.lang.funcLoop(() => {
            this.getServerVersion();
        }, DELAY);
    }

    private initPopover(): void {
        try {
            // initialize element
            this.element.setAttribute("title", ly.i18n.get("CompNetwork_popover_title"));
            globals.$(this.element.htmlElement).popover();
        } catch (err) {
            console.error("CompNetwork.initPopover()", err);
        }
    }

    private getServerVersion(): void {
        try {
            this._srvc_network.version((error, response) => {
                let connected: boolean;
                if (!error && !!response) {
                    if (!this._server_version || this._server_version != response[0]) {
                        this._server_version = response[0];
                    }
                    connected = true;
                } else {
                    connected = false;
                }
                this._fld_icon.value(connected ? status.CONNECTED : status.NOT_CONNECTED);
                this._fld_info.value(connected ? ly.i18n.get("CompNetwork_info_active") : ly.i18n.get("CompNetwork_info_maintenance"))

                this.element.setAttribute("data-content", this.createPopoverDataContent());
                ApplicationController.connected = connected;
            });
        } catch (err) {
            console.error("CompNetwork.getServerVersion()", err);
        }
    }

    private createPopoverDataContent(): string {

        let server_version = !!this._server_version
            ? this._server_version
            : ly.i18n.get("CompNetwork_server_version_unknown");

        let result: string = "";
        result += ly.i18n.get("CompNetwork_client_version") + " " + this._client_version;
        result += "<br>";
        result += ly.i18n.get("CompNetwork_server_version") + " " + server_version;
        return result;

    }

}