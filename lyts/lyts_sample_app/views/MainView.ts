
import style from "./MainStyle";

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="">
                ${ style(uid, props) }
   
                MAIN PAGE
                        
            </div>

        `;
}