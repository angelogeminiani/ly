export default function view(uid: string, props?: any): string {
    props = props || {};
    return `
            <div id="${uid}" class="--full-size">
                <!-- top bar -->
                <div class="--sub-page-topbar">
                    <div class="container">
                        PAGE TOPBAR HERE                 
                    </div>
                    <!-- BACK -->
                    <div id="${uid}_btn_back" class="--sub-page-back">
                        <i class="material-icons">navigate_before</i>                    
                    </div>
                </div>   
                <!-- content -->
                <div class="--sub-page-content">
                    <div class="container">                    
                        PAGE CONTENT HERE                                                                 
                    </div>
                </div>
                
            </div>
        `;
}