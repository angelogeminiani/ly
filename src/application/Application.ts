import Events, {Listener} from "../commons/events/Events";
import {Dictionary} from "../commons/collections/Dictionary";
import BaseObject from "./BaseObject";


class ApplicationEvents {

    private readonly _listeners: Dictionary<Events>;

    constructor() {
        this._listeners = new Dictionary<Events>();
    }

    public on(scope: BaseObject, eventName: string, listener: Listener): void {
        let key: string = ApplicationEvents.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new Events());
        }
        this._listeners.get(key).on(eventName, listener.bind(scope));
    }

    public once(scope: BaseObject, eventName: string, listener: Listener): void {
        let key: string = ApplicationEvents.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new Events());
        }
        this._listeners.get(key).once(eventName, listener.bind(scope));
    }

    public off(scope: BaseObject, eventName: string): void {
        let key: string = ApplicationEvents.key(scope);
        if (this._listeners.containsKey(key)) {
            this._listeners.get(key).off(eventName);
        }
    }

    public emit(eventName: string, ...args: any[]): void {
        let keys: string[] = this._listeners.keys();
        for (let key of keys) {
            if (this._listeners.containsKey(key)) {
                this._listeners.get(key).emit(eventName, ...args);
            }
        }
    }

    public clear(): void {
        let keys: string[] = this._listeners.keys();
        for (let key of keys) {
            if (this._listeners.containsKey(key)) {
                this._listeners.get(key).clear();
            }
        }
    }

    private static key(scope: BaseObject): string {
        try {
            return scope.uid;
        } catch (err) {
            console.warn("ApplicationEvents.key()", "BINDING EVENT ON DEFAULT KEY!");
            return '_default';
        }
    }
}

/**
 * Main Application Controller.
 * This is a singleton
 */
class Application {

    // ------------------------------------------------------------------------
    //                      C O N S T
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    //-- main event bus --//
    private readonly _events: ApplicationEvents;

    //-- application global scope --//
    private readonly _scope: Dictionary<any>;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    private constructor() {
        this._events = new ApplicationEvents();
        this._scope = new Dictionary();
    }

    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------

    public get events(): ApplicationEvents {
        return this._events;
    }

    public get scope(): Dictionary<any> {
        return this._scope;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public clear(): void {
        if (!!this._scope) {
            this._scope.clear();
        }
        if (!!this._events) {
            this._events.clear();
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: Application;

    public static instance(): Application {
        if (null == Application.__instance) {
            Application.__instance = new Application();
        }
        return Application.__instance;
    }

}

export default Application.instance();