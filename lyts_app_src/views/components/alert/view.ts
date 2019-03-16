

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
        <div id="${uid}" class="alert alert-dismissible fade show" role="alert">
          <div id="${uid}_message">MESSAGE</div>
          <button id="${uid}_btn_close" type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        `;
}