export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="--full-size container"> 
                
                   <h1 data-i18n="PageMaintenance_title">MAINTENANCE</h1>                   
                   <p data-i18n="PageMaintenance_help"></p>
                                                           
            </div>

        `;
}