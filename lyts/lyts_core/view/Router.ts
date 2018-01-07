import ly from "../ly";
import {Dictionary} from "../commons/collections/Dictionary";
import EventEmitter from "../commons/events/EventEmitter";
import ElementWrapper from "./components/ElementWrapper";
import console from "../commons/console";

/**
 * Route wrapper.
 * Utility class to wrap route properties.
 */
class Route {

    constructor(route: string, handler: Function | null) {
        this.path = route;
        this.handler = handler;
        this.tokens = this.tokenize(route);
        this.params = false;
    }

    public path: string;
    public handler: Function | null;
    public tokens: string[];
    public params: any;

    public uid(): string {
        try {
            return ly.lang.className(this.handler) + "." + ly.objects.values(this.params).join('.');
        } catch (err) {
            console.error("Route.uid", err);
        }
        return ly.random.guid();
    }

    public isEmpty(): boolean {
        return !this.handler;
    }

    public match(url: string): boolean {
        try {
            const url_tokens: string[] = this.tokenize(url);
            if (url_tokens.length === this.tokens.length) {
                const params = this.mapTokens(url_tokens);
                if (!!params) {
                    this.params = params;
                    return true;
                }
            }
        } catch (err) {
            console.error("Route.match", err);
        }
        return false;
    }

    private tokenize(s: string): string[] {
        const response: string[] = [];
        if (!!s) {
            const tokens: string[] = s.split('/');
            for (let token of tokens) {
                if (!!token) {
                    response.push(token);
                }
            }
        }
        return response;
    }

    private mapTokens(url_tokens: string[]): any {
        const params: any = {};
        let count = 0;
        for (let i = 0; i < this.tokens.length; i++) {
            const route_token: string = this.tokens[i];
            const url_token: string = url_tokens[i];
            const route_token_is_param: boolean = route_token.indexOf(':') === 0; // starts with :
            if (route_token !== url_token && !route_token_is_param) {
                break;
            }
            count++; // match found
            if (route_token_is_param) {
                params[route_token.substring(1)] = url_token;
            }
        }
        // returns params if all matches count
        return count === this.tokens.length ? params : false;
    }
}

// ------------------------------------------------------------------------
//                      c o n s t
// ------------------------------------------------------------------------

const _EVENT_POP_STATE: string = 'popstate';
const _EVENT_HASH_CHANGE: string = 'hashchange';
const _EMPTY: string = 'empty';
const _DEF_HASH = '#!';

const EVENT_ON_ROUTE = 'on_route'; // route found

/**
 * Handle a simple routing between pages.
 *
 */
class Router
    extends EventEmitter {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _routes: Dictionary<Route>;

    private _home_route: Route;
    private _last_route: Route;

    private _mode: string;
    private _native_listener: EventListener;

    // properties
    private _root: string;
    private _hash: string;
    private _use_hash: boolean;
    private _paused: boolean;
    private _debug_mode: boolean;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(root: string = '', hash: string = _DEF_HASH) {
        super();

        this._routes = new Dictionary<Route>();

        this._mode = ly.browser.isPushStateAvailable() ? _EVENT_POP_STATE : ly.browser.isHashChangeAvailable() ? _EVENT_HASH_CHANGE : _EMPTY;
        this._native_listener = this.onLocationChange.bind(this);

        this._hash = !!hash ? hash : _DEF_HASH;
        this._use_hash = true;

        this._root = root;

        this._paused = false;
        this._debug_mode = false;

        this.initialize();
    }

    public toString(): string {
        return JSON.stringify({
            uid: this.uid,
            root: this.root,
            hash: this.hash,
            useHash: this.useHash,
            paused: this.paused,
            routes: this._routes
        });
    }

    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------

    public get root(): string {
        return this._root;
    }

    public get hash(): string {
        return this._hash;
    }

    public get useHash(): boolean {
        return this._use_hash;
    }

    public set useHash(value: boolean) {
        this._use_hash = value;
    }

    public get paused(): boolean {
        return this._paused;
    }

    public set paused(value: boolean) {
        this._paused = value;
    }

    public get debugMode(): boolean {
        return this._debug_mode;
    }

    public set debugMode(value: boolean) {
        this._debug_mode = value;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    /**
     * START ROUTER
     */
    public start(elem: ElementWrapper | null): void {
        this.initialize();
        this.startListen();
        this.resolve();

        if (null != elem) {
            // ready to replace relative links adding current root
            this.replaceLinks(elem);
        }

        this.debug("start", this);
    }

    /**
     * STOP ROUTER
     */
    public stop(): void {
        this.clear();
        // remove listeners
        this.stopListen();
    }

    public clear(): void {
        this._routes.clear();
    }

    /**
     * Register a rout handler
     * @param {string} route Route url. "/page1", "/page2/:id/:name"
     * @param {Page, Function} handler Route handle
     * @return {Router} this
     */
    public register(path: string, handler: Function): Router {
        path = path || '/';
        const route = new Route(path, handler);
        if (this._routes.count() === 0) {
            // first page is also home page
            this._home_route = route;
        }
        this._routes.put(path, route);

        return this;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private debug(method_name: string, ...args: any[]): void {
        if (this._debug_mode) {
            console.log(`[${this.uid}] Router.` + method_name, ...args)
        }
    }

    private initialize(): void {
        if (!!this._root) {
            this._root = this._use_hash
                ? this.root.replace(/\/$/, '/' + this._hash)
                : this.root.replace(/\/$/, '');
        } else if (this._use_hash) {
            this._root = ly.browser.location().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
        }
    }

    private startListen(): void {
        if (ly.browser.isReady()) {
            const event_name: string = this._mode;
            window.addEventListener(event_name, this._native_listener);
        } else {
            console.warn("startListen", "Browser not Ready!")
        }
    }

    private stopListen(): void {
        if (ly.browser.isReady()) {
            const event_name: string = this._mode;
            window.removeEventListener(event_name, this._native_listener);
        }
    }

    private onLocationChange() {
        this.debug('onLocationChange');
        if (!this.paused) {
            this.resolve();
        }
    }

    private getRoute(url: string): Route {
        this.debug('getRoute', url);
        if (!this._routes.isEmpty() && !this.paused) {
            const paths: string[] = this._routes.keys();
            for (let path of paths) {
                const route: Route = this._routes.get(path);
                if (route.match(url)) {
                    this.debug('getRoute#found', route);
                    return route;
                }
            }
            return this._home_route; // fallback page is always home page
        }
        return new Route("", null); // empty route
    }

    // https://github.com/krasimir/navigo/blob/master/src/index.js
    private resolve(raw_path?: string): void {
        raw_path = !!raw_path ? Router.normalize(raw_path) : Router.normalize(ly.browser.location());
        // remove root from url
        const url = raw_path.replace(this.root, '').replace(this.hash, '');
        const last_uid = !!this._last_route ? this._last_route.uid() : '';
        const route = this.getRoute(url);
        if (!route.isEmpty()) {
            const curr_uid = route.uid();
            //console.log("resolve", last_uid, curr_uid);
            if (last_uid === curr_uid) {
                // alredy routed
                return;
            }
            this._last_route = route;
            super.emit(EVENT_ON_ROUTE, route);
        }
    }

    private replaceLinks(elem: ElementWrapper): void {
        const native: HTMLElement | null = elem.htmlElement;
        if (!!native) {
            const childs: Array<HTMLElement> = ly.dom.get('[data-router=relative]', native);
            for (let i = 0; i < childs.length; i++) {
                const child: HTMLElement = childs[i];
                const path: string = child.getAttribute('href') || '';
                if (!!path) {
                    const new_path = this.root + (this.useHash ? this.hash : '/') + path;
                    child.setAttribute('href', new_path);
                    this.debug('replaceLinks', '"' + path + '"', '"' + new_path + '"');
                }
            }
        }
    }

    static normalize(s: string): string {
        return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: Router;

    public static instance(): Router {
        if (null == Router.__instance) {
            Router.__instance = new Router();
        }
        return Router.__instance;
    }
}


export {Router, Route, EVENT_ON_ROUTE};

