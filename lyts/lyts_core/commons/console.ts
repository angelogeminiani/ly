/**
 * Extends standard console
 */
import random from "./random";

enum LogLevel {
    error = 0,
    warn = 1,
    info = 2,
    debug = 3
}

class console_ext {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _uid: string;
    private _level: LogLevel;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    private constructor() {
        this._uid = random.guid();
        this._level = LogLevel.info;
    }

    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------

    public get uid() {
        return this._uid;
    }

    public set uid(value: string) {
        this._uid = value;
    }

    public get level(): LogLevel {
        return this._level;
    }

    public set level(value: LogLevel) {
        this._level = value;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public error(scope: string, error: Error | string, ...args: any[]): void {
        console.error("[" + this.uid + "] " + scope, error, ...args);
    };

    public warn(scope: string, ...args: any[]): void {
        if (this._level < LogLevel.warn) {
            return;
        }
        console.warn("[" + this.uid + "] " + scope, ...args);
    };

    public info(scope: string, ...args: any[]): void {
        if (this._level < LogLevel.info) {
            return;
        }
        console.info("[" + this.uid + "] " + scope, ...args);
    };

    public debug(scope: string, ...args: any[]): void {
        if (this._level < LogLevel.debug) {
            return;
        }
        console.log("[" + this.uid + "] " + scope, ...args);
    };

    public log(scope: string, ...args: any[]): void {
        if (this._level < LogLevel.info) {
            return;
        }
        console.log("[" + this.uid + "] " + scope, ...args);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        this.uid = random.guid();
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: console_ext;

    public static instance(): console_ext {
        if (null == console_ext.__instance) {
            console_ext.__instance = new console_ext();
        }
        return console_ext.__instance;
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default console_ext.instance();
export {LogLevel};

