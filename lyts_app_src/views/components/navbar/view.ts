

export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
        <nav id="${uid}" class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark pt-1 pb-1">
          <a class="navbar-brand" data-router="relative" href="?#!/00_dashboard/dashboard">
             <img id="${uid}_logo" src="build/_brand/logo.png" class="--navbar-logo d-inline-block align-top" alt="">    
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        
          <div class="collapse navbar-collapse" id="navbarSupportedContent">                                
           
            <ul class="navbar-nav mr-auto">
             <!-- 
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li>
              -->
            </ul>
            
            
            <div id="${uid}_network_box" class="d-flex"></div>
            <div id="${uid}_user_box" class="d-flex"></div>            
          </div>
        </nav>

        `;
}