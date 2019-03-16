export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
        <div id="${uid}" class="--loading container">
            <img alt="loading" src="build/assets/images/spinner-ring.gif" width="64" style="width: 64px;">
            <p data-i18n="lbl_loading">...</p>
        </div>

        `;
}