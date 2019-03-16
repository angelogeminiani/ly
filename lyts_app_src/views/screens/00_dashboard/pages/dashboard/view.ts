

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="--full-size container">

                <h1 data-i18n="PageDashboard_title">DASHBOARD</h1>
                <div id="${uid}_content" class="row"></div>                                                                                                                                                   
            </div>

        `;
}