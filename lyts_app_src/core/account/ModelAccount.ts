export default interface ModelAccount {

    _key: string;

    auth: { username: string, password: string };
    person: any;
    company: any;
    lang: string;
    roles: Array<ModelAccountRole>;
    current_role: ModelAccountRole | null;

}

export interface ModelAccountRole {
    company_id: string;
    role_id: string;
    role_name: string;
    include_apps: Array<string>;
}


