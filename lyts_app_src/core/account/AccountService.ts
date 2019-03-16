import {ServiceCallback} from "../services/AbstractService";
import AbstractProgramService from "../services/AbstractProgramService";
import ApplicationController from "../ApplicationController";
import ly from "../../../lyts/lyts_core/ly";


const ENDPOINT: string = "account";

/**
 * API for Account creation and update
 */
export default class AccountService
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


    public login(email: string, password: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'login';
        request_data.params.push(email);
        request_data.params.push(password);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public register(email: string, password: string, company_name: string, company_vat: string, company_address: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'register';
        request_data.params.push(email);
        request_data.params.push(password);
        request_data.params.push(company_name);
        request_data.params.push(company_vat);
        request_data.params.push(company_address);
        request_data.params.push(ApplicationController.lang);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public reset_password(email: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'reset_password';
        request_data.params.push(email);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public change_password(account_id: string, password: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'change_password';
        request_data.params.push(account_id);
        request_data.params.push(password);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    // ------------------------------------------------------------------------
    //                      a c c o u n t
    // ------------------------------------------------------------------------

    public get_account(key: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_account';
        request_data.params.push(key);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public get_accounts_by_id(account_ids: Array<string>, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_accounts_by_id';
        request_data.params.push(account_ids);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public get_account_by_email(email: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_account_by_email';
        request_data.params.push(email);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public get_accounts_by_company_id(company_id: string, exclude_keys: Array<string>, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_accounts_by_company_id';
        request_data.params.push(company_id);
        request_data.params.push(exclude_keys);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public upsert_account(item: any, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'upsert_account';
        request_data.params.push(item);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    // ------------------------------------------------------------------------
    //                      a c c o u n t   o r g.   g r a p h
    // ------------------------------------------------------------------------

    public find_accounts(filter: string,
                         filter_params: any,
                         sort: string,
                         skip: number,
                         limit: number,
                         callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'find_accounts';
        request_data.params.push(filter);
        request_data.params.push(filter_params);
        request_data.params.push(sort);
        request_data.params.push(skip);
        request_data.params.push(limit);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public set_account_parent_to_documents(company_id: string, parent_id: string, account_id: string, allow_read: boolean, allow_edit: boolean, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'set_account_parent_to_documents';
        request_data.params.push(company_id);
        request_data.params.push(parent_id);
        request_data.params.push(account_id);
        request_data.params.push(allow_read);
        request_data.params.push(allow_edit);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public add_account_parent(company_id: string, parent_id: string, account_id: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'add_account_parent';
        request_data.params.push(company_id);
        request_data.params.push(parent_id);
        request_data.params.push(account_id);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public remove_account_parent(company_id: string, parent_id: string, account_id: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'remove_account_parent';
        request_data.params.push(company_id);
        request_data.params.push(parent_id);
        request_data.params.push(account_id);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    // ------------------------------------------------------------------------
    //                      p e o p l e
    // ------------------------------------------------------------------------

    public get_people(key: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_people';
        request_data.params.push(key);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public remove_people(key: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'remove_people';
        request_data.params.push(key);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public upsert_people(item: any, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'upsert_people';
        request_data.params.push(item);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public find_people(filter: string,
                       filter_params: any,
                       sort: string,
                       skip: number,
                       limit: number,
                       callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'find_people';
        request_data.params.push(filter);
        request_data.params.push(filter_params);
        request_data.params.push(sort);
        request_data.params.push(skip);
        request_data.params.push(limit);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    /*
    public execute_people(query: string,
                          query_params: any,
                          callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'execute_people';
        request_data.params.push(query);
        request_data.params.push(query_params);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }*/

    // ------------------------------------------------------------------------
    //                      search keys for autocompletition
    // ------------------------------------------------------------------------

    public get_search_keys_people(company_id: string, callback: ServiceCallback): void {
        this.get_tags_people(company_id, (err: any, tags: Array<string>) => {
            if (!!err) {
                callback(err, []);
            } else {
                this.get_companies_people(company_id, (err: any, companies: Array<string>) => {
                    if (!!err) {
                        callback(err, []);
                    } else {
                        this.get_role_names_people(company_id, (err: any, roles: Array<string>) => {
                            if (!!err) {
                                callback(err, []);
                            } else {
                                const all: Array<string> = [];
                                ly.arrays.pushFlattenUnique(all, tags, companies, roles);
                                callback(false, all);
                            }
                        });
                    }
                });
            }
        });
    }

    public get_tags_people(company_id: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_tags_people';
        request_data.params.push(company_id);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public get_companies_people(company_id: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_companies_people';
        request_data.params.push(company_id);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    public get_role_names_people(company_id: string, callback: ServiceCallback): void {
        const request_data = this.request;
        request_data.function = ENDPOINT + '.' + 'get_role_names_people';
        request_data.params.push(company_id);
        super.post(request_data).then((req_resp) => {
            super.invoke(callback, req_resp);
        }).catch((req_resp) => {
            super.invoke(callback, req_resp);
        });
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: AccountService;

    public static instance(): AccountService {
        if (null == AccountService.__instance) {
            AccountService.__instance = new AccountService();
        }
        return AccountService.__instance;
    }

}

