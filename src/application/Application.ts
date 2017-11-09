import Events from "../commons/events/Events";
import {Dictionary} from "../commons/collections/Dictionary";


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
    private readonly _events: Events;

    //-- application global scope --//
    private readonly _scope: Dictionary<any>;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    private constructor() {
        this._events = new Events();
        this._scope = new Dictionary();
    }

    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------

    public get events(): Events {
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