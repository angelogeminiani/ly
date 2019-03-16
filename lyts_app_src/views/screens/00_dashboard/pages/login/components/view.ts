export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
        <div id="${uid}" class="d-flex justify-content-between align-items-end w-100 border-bottom mb-2 pb-2 pt-1 pl-3 pr-3">            
            <h5 id="${uid}_fld_name" class="mb-0"></h5>
            <button id="${uid}_btn_enter" type="button" class="btn btn-primary" data-i18n="CompCompanyItem_enter"></button>                                                                                               
        </div>

        `;
}