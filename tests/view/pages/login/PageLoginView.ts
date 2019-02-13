import i18n from "../../../../lyts/lyts_core/view/i18n";


export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}">
                <form>
                    <label for="${uid}-username" data-i18n="lbl_username">INSERT USERNAME</label>
                    <input id="${uid}-username" data-id="username" data-i18n="ph_username"
                        type="text" value="${props.username || 'hello'}" placeholder="">
                    
                    <br>
                    
                    <label for="${uid}-password" data-i18n="lbl_password">INSERT PASSWORD</label>    
                    <input id="${uid}-password" data-id="password" data-i18n="ph_password"
                        type="password" value="${props.password || ''}" placeholder="">
                     
                     <br>
                     
                     <textarea id="${uid}-tarea" data-id="tarea"
                         placeholder="">TEST</textarea>
                        
                    <input id="${uid}-check" data-id="check"
                        type="checkbox" > 
                         
                    <input id="${uid}-button" data-id="btn-login" type="button" data-i18n="btn_login" value="LOGIN">
                    
                    <div data-id="btn-click">
                        CLICK ME!
                    </div>
                    <br>
                    <div data-id="btn-click-remove">
                        CLICK TO REMOVE!
                    </div>
                    
                    ${i18n.get("lbl_username")}
                    
                </form>
            </div>
        `;

}