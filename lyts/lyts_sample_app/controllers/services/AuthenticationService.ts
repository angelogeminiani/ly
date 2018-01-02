import AbstractService, {ServiceCallback} from "./AbstractService";

const PATH: string = '/api/account/';

/**
 * SAMPLE AUTHENTICATION SERVICE
 */
export default class AuthenticationService
    extends AbstractService {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(host: string, app_token: string) {
        super(host, app_token);
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public login(username: string, password: string, callback: ServiceCallback): void {
        let data = {
            'app_token': this.app_token,
            'username': username,
            'password': password
        };
        super.post(PATH + "login", data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}

