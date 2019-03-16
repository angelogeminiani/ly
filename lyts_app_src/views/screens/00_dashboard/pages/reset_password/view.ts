export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="--full-size container">

                <h1 data-i18n="PageResetPassword_title">RESET PASSWORD</h1>
                
                <form>
                  <div class="form-group">
                    <label for="${uid}_fld_email" data-i18n="PageResetPassword_email">EMAIL ADDRESS</label>
                    <input id="${uid}_fld_email" data-i18n="PageResetPassword_email_ph" type="email" class="form-control" placeholder="ENTER EMAIL">                    
                  </div>
                  
                  <div class="d-flex align-items-center mt-2">
                    <button id="${uid}_btn_submit" class="btn btn-primary" data-i18n="PageResetPassword_submit" type="submit">SUBMIT</button>
                    <div class="d-flex align-self-end align-items-baseline ml-3">
                        <small class="form-text text-muted" data-i18n="PageResetPassword_try_login"></small>
                        <a class="badge badge-light ml-1" data-i18n="PageResetPassword_goto_login" data-router="relative" href="00_dashboard/login" >GOTO LOGIN</a>
                    </div>
                  </div>
                  
                </form>
                
                <div id="${uid}_alert_box" class="mt-3"></div>
                                                                       
            </div>

        `;
}