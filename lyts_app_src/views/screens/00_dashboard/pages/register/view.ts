export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="--full-size container">
               
                <h1 data-i18n="PageRegister_title">REGISTER</h1>
            
                <form>
                  <div class="form-group">
                    <label for="${uid}_fld_email" data-i18n="PageRegister_email">EMAIL ADDRESS</label>
                    <input id="${uid}_fld_email" class="form-control" data-i18n="PageRegister_email_ph" type="email" aria-describedby="${uid}_email_help" placeholder="ENTER EMAIL">
                    <small id="${uid}_email_help" class="form-text text-muted" data-i18n="PageRegister_email_h">NO SHARE EMAIL</small>
                  </div>
                  
                  <div class="form-group">
                    <label for="${uid}_fld_password" data-i18n="PageRegister_password">PASSWORD</label>
                    <input id="${uid}_fld_password" class="form-control" data-i18n="PageRegister_password_ph" type="password"  placeholder="PASSWORD">                   
                  </div>
                  
                  <div class="form-group">
                    <label for="${uid}_fld_repassword" data-i18n="PageRegister_repassword">RE-PASSWORD</label>
                    <input id="${uid}_fld_repassword" class="form-control" data-i18n="PageRegister_repassword_ph" type="password"  placeholder="RE-PASSWORD">                   
                  </div>
                  
                  <div class="form-group">
                    <label for="${uid}_fld_company_name" data-i18n="PageRegister_company_name">COMPANY NAME</label>
                    <input id="${uid}_fld_company_name" class="form-control" data-i18n="PageRegister_company_name_ph" type="text"  placeholder="COMPANY NAME">                   
                  </div>
                  
                  <div class="form-group">
                    <label for="${uid}_fld_company_vat" data-i18n="PageRegister_company_vat">VAT NUMBER</label>
                    <input id="${uid}_fld_company_vat" class="form-control" data-i18n="PageRegister_company_vat_ph" type="text"  placeholder="VAT NUMBER">                   
                  </div>
                  
                  <div class="form-group">
                    <label for="${uid}_fld_company_address" data-i18n="PageRegister_company_address">ADDRESS</label>
                    <textarea  id="${uid}_fld_company_address" class="form-control" data-i18n="PageRegister_company_address_ph" type="text"  placeholder="ADDRESS"></textarea>                   
                  </div>
                  
                  <div class="d-flex align-items-center mt-2">
                    <button id="${uid}_btn_submit" class="btn btn-primary" data-i18n="PageRegister_submit" type="submit">SUBMIT</button>
                    <div class="d-flex align-self-end align-items-baseline ml-3">
                        <small class="form-text text-muted" data-i18n="PageRegister_already_register"></small>
                        <a class="badge badge-light ml-1" data-i18n="PageRegister_goto_login" data-router="relative" href="00_dashboard/login" >GOTO LOGIN</a>
                    </div>
                  </div>
                                    
                </form>
                
                <div id="${uid}_alert_box" class="mt-3"></div>
                                                                                                                     
            </div>

        `;
}