export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
        <div id="${uid}" class="--navbar-user d-flex align-items-center my-2 my-lg-0">
            <img id="${uid}_image" src="build/assets/images/user.png" class="--img-sm mr-2 rounded-circle" alt=""> 
             
            <div id="${uid}_dropdown" class="hidden d-flex flex-column dropleft">
              <button id="${uid}_btn_user" class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span id="${uid}_fld_name" class="--text-md text-white mb-0"></span>
              </button>
              <div class="dropdown-menu" aria-labelledby="${uid}_btn_user">
                <div class="dropdown-header">
                    <h6 id="${uid}_fld_role_name">ROLE</h6>
                    <div id="${uid}_fld_company" class="--text-md">COMPANY</div>
                    <div id="${uid}_fld_signature" class="--text-sm">SIGNATURE</div>
                </div>
                <div class="dropdown-divider"></div>
                <a id="${uid}_btn_exit" class="dropdown-item" href="#" data-i18n="lbl_exit">EXIT</a>
              </div>
            </div>
            <!--
            <div class="d-flex flex-column">
                <label id="${uid}_fld_name" class="text-white mb-0"></label>
                <small id="${uid}_fld_role_name" class="text-white text-right mb-0"></small>            
            </div>
            -->                  
        </div>
        `;
}