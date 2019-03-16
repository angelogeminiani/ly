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
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Recipient:</label>
                    <input id="recipient-name" type="text" class="form-control" >
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">Message:</label>
                    <textarea id="message-text" class="form-control" ></textarea>
                  </div>
                </form>
              </div>
              
              <div class="modal-footer">
                <button id="${uid}_btn_undo" type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
                <button id="${uid}_btn_confirm" type="button" class="btn btn-primary" data-dismiss="modal">YES</button>
              </div>
            </div>

        `;
}