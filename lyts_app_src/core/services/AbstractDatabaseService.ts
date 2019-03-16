import AbstractService from "./AbstractService";
import constants from "../../constants";
import {RequestOptions, RequestResult} from "../../../lyts/lyts_core/net/HttpClient";
import ApplicationController from "../ApplicationController";

// ------------------------------------------------------------------------
//                      c o n s t
// ------------------------------------------------------------------------

const HOST: string = constants.host;
const APP_TOKEN: string = constants.APP_TOKEN;

const PATH: string = '/api/database/invoke/';
const DATABASE: string = constants.uid;

// ------------------------------------------------------------------------
//                      c l a s s
// ------------------------------------------------------------------------

/**
 *
 */
export default class AbstractDatabaseService
    extends AbstractService {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _collection: string;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(collection: string) {
        super(HOST, APP_TOKEN);
        this._collection = collection;
    }

    // ------------------------------------------------------------------------
    //                      p r o t e c t e d
    // ------------------------------------------------------------------------

    protected get request() {
        return {
            'app_token': this.app_token,
            'lang': ApplicationController.lang,
            'client_id': ApplicationController.user_id,
            'database': DATABASE, // application name
            'collection': this._collection,
            'query': '',
            'params': {},
            'transform': {}
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

