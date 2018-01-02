
import style from "./MainStyle";

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <section id="${uid}" class="page --unscrollable">
                ${ style(uid, props) }
   
                
                        
            </section>

        `;
}