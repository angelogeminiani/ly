/**
 * Browser Utility class
 */
import lang from "../commons/lang";

class browser {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _on_resize_callback: (w: number, h: number) => void;

    private _debounce_wait: number;
    private _debounce_func: any;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    private constructor() {
        this.init();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public isReady(): boolean {
        return !!document && !!navigator && !!window;
    }

    public language(): string {
        if (this.isReady()) {
            return navigator.language;
        }
        return '';
    }

    public lang(): string {
        return this.language().split('-')[0];
    }

    public location(): string {
        return window.location.href;
    }

    public hasStorage(): boolean {
        return (typeof(Storage) !== "undefined");
    }

    public isMobile(): boolean {
        if (this.isReady()) {
            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor);
            return check;
        }
        return false;
    }

    public userAgent(): string {
        return this.isReady() ? navigator.userAgent || navigator.vendor : "";
    }

    public name(): string {
        return this.isReady() ? navigator.appName : "";
    }

    public engine(): string {
        return this.isReady() ? navigator.product : "";
    }

    public version(): string {
        return this.isReady() ? navigator.appVersion : "";
    }

    public platform(): string {
        return this.isReady() ? navigator.platform : "";
    }

    public onLine(): boolean {
        return this.isReady() ? navigator.onLine : false;
    }

    public cookieEnabled(): boolean {
        return this.isReady() ? navigator.cookieEnabled : false;
    }

    public size(): any {
        const size: any = {
            screen: {
                width: 0,
                height: 0,
                dpi: 0,
                color: 0,
                innerWidth: 0,
                innerHeight: 0,
            }
        };
        if (this.isReady()) {
            try {
                size.screen.width = screen.width;
                size.screen.height = screen.height;
                size.screen.dpi = screen.pixelDepth;
                size.screen.color = screen.colorDepth;
                size.screen.innerHeight = innerHeight;
                size.screen.innerWidth = innerWidth;
            } catch (err) {
            }
        }
        return size;
    }
    
    public isPushStateAvailable(): boolean {
        return !!(
            typeof window !== 'undefined' &&
            window.history &&
            window.history.pushState
        );
    }

    public isHashChangeAvailable(): boolean {
        return !!(
            typeof window !== 'undefined' &&
            ('onhashchange' in window)
        );
    }

    public getParameterByName(name: string, url: string) {
        url = url || location.search;
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    public getParameters(query: string = ''): any {
        query = query || location.search;
        query = query.split('?').length > 1 ? query.split('?')[1] : query;
        const vars = query.split("&");
        const query_string: any = {};
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                const arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }

    // ------------------------------------------------------------------------
    //                      e v e n t s
    // ------------------------------------------------------------------------

    public onResize(callback: (w: number, h: number) => void, debounce: number = 200): void {
        //-- event hooks --//
        if (!!window) {
            this._on_resize_callback = callback;
            this._debounce_wait = debounce;

            if (!!this._debounce_func) {
                window.removeEventListener("resize", this._debounce_func);
            }
            this._debounce_func = lang.funcDebounce(this, this._resize, this._debounce_wait);
            window.addEventListener("resize", this._debounce_func);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {


    }

    private doResize(w: number, h: number) {
        if (!!this._on_resize_callback) {
            this._on_resize_callback(w, h);
        }
    }

    private _resize() {
        this.doResize(window.innerWidth, window.innerHeight);
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: browser;

    public static instance(): browser {
        if (null == browser.__instance) {
            browser.__instance = new browser();
        }
        return browser.__instance;
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default browser.instance();


