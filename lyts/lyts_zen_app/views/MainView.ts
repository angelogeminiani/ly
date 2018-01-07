
import style from "./MainStyle";

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="">
                ${ style(uid, props) }
   
                <nav>
                    <div class="nav-wrapper">
                      <a href="#" class="brand-logo">Logo</a>
                      <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a data-router="relative" href="page1">Page 1 (home)</a></li>
                        <li><a data-router="relative" href="page2/foo/boo">Page 2</a></li>
                        <li><a data-router="relative" href="call">Call a Function in Javascript</a></li>
                      </ul>
                    </div>
                </nav>
                
                <div id="${uid}_screens">
                
                </div>
                        
            </div>

        `;
}