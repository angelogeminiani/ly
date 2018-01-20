import style from "./style";

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="">
                ${ style(uid, props) }
   
                <h1>PAGE 1</h1>
                
                <br>
                <a id="${uid}_button" class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>CLICK ME</a>  
                <br>
                <img id="${uid}_image" src="">
                     
            </div>

        `;
}