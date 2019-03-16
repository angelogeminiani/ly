export default function view(uid: string, props?: any): string {
    props = props || {};
    return `                        
            <div id="${uid}" class="modal-content">
            
              <div class="modal-header">
                <h5 id="${uid}_title" class="modal-title">New message</h5>
                <button id="${uid}_btn_close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              
              <div class="modal-body">
                <div>
                    <p id="${uid}_message"></p>                    
                </div>
              </div>
              
              <div class="modal-footer">
                <button id="${uid}_btn_undo" data-i18n="lbl_undo" type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
                <button id="${uid}_btn_confirm" data-i18n="lbl_ok" type="button" class="btn btn-primary" data-dismiss="modal">YES</button>
              </div>
            </div>

        `;
}