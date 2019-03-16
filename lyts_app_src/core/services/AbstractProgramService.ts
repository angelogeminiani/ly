import AbstractService from "./AbstractService";
import constants from "../../constants";
import {RequestOptions, RequestResult} from "../../../lyts/lyts_core/net/HttpClient";
import ApplicationController from "../ApplicationController";

// ------------------------------------------------------------------------
//                      c o n s t
// ------------------------------------------------------------------------

const HOST: string = constants.host;
const APP_TOKEN: string = constants.APP_TOKEN;

const PATH: string = '/api/program/invoke/';

// ------------------------------------------------------------------------
//                      c l a s s
// ------------------------------------------------------------------------

/**
 * SAMPLE AUTHENTICATION SERVICE
 */
export default class AbstractProgramService
    extends AbstractService {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _endpoint: string;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(endpoint: string) {
        super(HOST, APP_TOKEN);
        this._endpoint = endpoint;
    }

    // ------------------------------------------------------------------------
    //                      p r o t e c t e d
    // ------------------------------------------------------------------------

    protected get request() {
        return {
            'app_token': this.app_token,
            'lang': ApplicationController.lang,
            'client_id': ApplicationController.user_id,
            'namespace': constants.server_namespace,
            'function': this._endpoint,
            'params': new Array<any>()
        };
    }

    public post(body: any = null,
                options?: RequestOptions): Promise<RequestResult> {
        return super.post(PATH, body, options);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}

