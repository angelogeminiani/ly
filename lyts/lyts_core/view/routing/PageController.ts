import Component from "../components/Component";
import {EVENT_ON_ROUTE, Route, Router} from "./Router";
import view from "./view";
import lang from "../../commons/lang";
import Page from "../components/page/Page";
import console from "../../commons/console";


abstract class PageController
    extends Component {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _router: Router;
    private _last_page: Page;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(root: string,
                hash: string = '') {
        super();

        this._router = new Router(root, hash);
        this._router.on(this, EVENT_ON_ROUTE, this.onRoute);
    }

    protected abstract route(page: Page): void;

    protected render(): string {
        return view(this.uid, {});
    }

    protected free(): void {
        this._router.stop();
        if (!!this._last_page) {
            this._last_page.remove();
        }
    }

    protected ready(): void {
        this._router.start();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public register(route: string, handler: Function): void {
        this._router.register(route, handler);
    }

    public current(): Page {
        return this._last_page;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private _init(): void {

    }

    private onRoute(route: Route): void {
        try {
            const params: any = route.params;
            const func: any = route.handler;

            if (lang.isFunction(func)) {
                if (lang.isConstructor(route.handler)) {
                    // close last page
                    if (!!this._last_page) {
                        const page:Page = this._last_page;
                        page.hide();
                        lang.funcDelay(() => {
                            page.remove();
                        }, 400);
                    }

                    this._last_page = new func(params);
                    this.route(this._last_page);
                } else {
                    // we have a callback
                    func(params);
                }
            }
        } catch (err) {
            console.error("PageController.onRoute", err);
        }
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default PageController;