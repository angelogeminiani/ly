import style from "./style";

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="">
                ${ style(uid, props) }
   
                <div class="container">
                   <h1>REGISTER</h1>
                   
                   <a href="login" class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>login</a>
                </div>
                        
            </div>

        `;
}