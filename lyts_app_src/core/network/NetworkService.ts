import {ServiceCallback} from "../services/AbstractService";
import AbstractProgramService from "../services/AbstractProgramService";



const ENDPOINT: string = "";

/**
 * API for Network creation and update
 */
export default class NetworkService
    extends AbstractProgramService {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super(ENDPOINT);
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    public name(callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = 'name';
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }


    public version(callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = 'version';
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public versions(callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = 'versions';
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}

