

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="--full-size">
                <div id="${uid}_pages" class="--full-size"></div>        
            </div>

        `;
}