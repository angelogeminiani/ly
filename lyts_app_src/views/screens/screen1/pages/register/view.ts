import style from "./style";

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="">
                ${ style(uid, props) }
   
                <div class="container">
                   <h1>REGISTER</h1>
                   
                   <div class="col">
                        <a data-router="relative" href="screen1/login" class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>login</a>
                   </div>
                   <br>
                    <div class="col">
                        <a data-router="relative" href="screen2/page1" class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>NEXT PAGE</a>
                    </div>
                </div>
                        
            </div>

        `;
}