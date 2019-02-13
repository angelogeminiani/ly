import style from "./style";

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}">
                ${ style(uid, props) }
   
                <div class="container">
                   <h1>LOGIN</h1>
                   
                   <a data-router="relative" href="screen1/register" class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>register</a>
                   <br>    <br>
                   <a data-router="relative" href="screen2/page1" class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>NEXT PAGE</a>
                </div>
                     
            </div>

        `;
}