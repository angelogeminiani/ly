export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="--full-size container">
               
                <h1 data-i18n="PageLogin_title">LOGIN</h1>
            
                <div id="${uid}_step_1">
                    <form>
                      <div class="form-group">
                        <label for="${uid}_fld_email" data-i18n="PageLogin_email">EMAIL ADDRESS</label>
                        <input id="${uid}_fld_email" class="form-control" data-i18n="PageLogin_email_ph" type="email" aria-describedby="${uid}_email_help" placeholder="ENTER EMAIL">
                        <small id="${uid}_email_help" class="form-text text-muted" data-i18n="PageLogin_email_h">NO SHARE EMAIL</small>
                      </div>
                      
                      <div class="form-group">
                        <label for="${uid}_fld_password" data-i18n="PageLogin_password">PASSWORD</label>
                        <input id="${uid}_fld_password" class="form-control" data-i18n="PageLogin_password_ph" type="password"  placeholder="PASSWORD">
                        <div class="d-flex align-items-baseline">
                            <small class="form-text text-muted" data-i18n="PageLogin_password_forgot"></small>
                            <a class="badge badge-light" data-router="relative" href="00_dashboard/reset_password" data-i18n="PageLogin_password_reset">Reset Password</a>
                        </div>
                      </div>
                      
                      <div class="form-check">
                        <input id="${uid}_fld_rememberme" class="form-check-input" type="checkbox" >
                        <label class="form-check-label" data-i18n="PageLogin_rememberme" for="${uid}_fld_rememberme">REMEMBER</label>
                      </div>
                      
                      <div class="d-flex align-items-center mt-2">
                        <button id="${uid}_btn_submit" class="btn btn-primary" data-i18n="PageLogin_submit" type="submit">SUBMIT</button>
                        <div class="d-flex align-self-end align-items-baseline ml-3">
                            <small class="form-text text-muted" data-i18n="PageLogin_not_register_yet"></small>
                            <a class="badge badge-light ml-1" data-i18n="PageLogin_register" data-router="relative" href="00_dashboard/register" >REGISTER</a>
                        </div>
                      </div>
                    </form>     
                </div>
                
                <div id="${uid}_step_2" class="hidden">
                    <!-- help --> 
                    <p data-i18n="PageLogin_select_company_help"></p>
                    <!-- companies list -->
                    <div id="${uid}_companies_box">
                    </div>                                
                </div>
                
                <div id="${uid}_alert_box" class="mt-3"></div>         
                                                                                                                     
            </div>

        `;
}