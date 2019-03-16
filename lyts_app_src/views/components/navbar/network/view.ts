

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
        <div id="${uid}" class="d-flex align-items_center text-white --cursor-pointer my-2 my-lg-0 mr-2" data-toggle="popover" title="DRILLIO" data-content="CONTENT" data-placement="bottom" data-html="true">              
            <i id="${uid}_fld_icon" class="material-icons" >power</i>   
            <label id="${uid}_fld_info" class="text-white mb-0 d-lg-none"></label>                                                                                  
        </div>

        `;
}