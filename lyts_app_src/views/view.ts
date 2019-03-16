export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}">
                <div id="${uid}_nav"></div>  
                <div id="${uid}_screens" class="--screens"></div>        
            </div>

        `;
}