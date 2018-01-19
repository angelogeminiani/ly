/**
 * Utility class
 */
import random from "./random";
import {Dictionary} from "./collections/Dictionary";

class langClass {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _debounced_func: Dictionary<Function>;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        this._debounced_func = new Dictionary<Function>();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public parse(value: any): any {
        try {
            if (this.isString(value)) {
                return JSON.parse(value);
            }
        } catch (err) {
        }
        return value;
    }

    // ------------------------------------------------------------------------
    //                      t o
    // ------------------------------------------------------------------------

    public toString(value: any): string {
        switch (typeof value) {
            case 'string':
            case 'number':
            case 'boolean':
                return value + '';
            case 'object':
                try {
                    // null is an object but is falsy. Swallow it.
                    return value === null ? '' : JSON.stringify(value);
                } catch (jsonError) {
                    return '{...}';
                }
            default:
                // Anything else will be replaced with an empty string
                // For example: undefined, Symbol, etc.
                return '';
        }
    }

    public toArray<T>(value: any | any[]) {
        return !!value
            ? this.isArray(value) ? value as Array<T> : [value as T]
            : [];
    }

    public toBoolean(value: any, def_val: boolean): boolean {
        return !!value
            ? value !== 'false' && value !== '0'
            : def_val;
    }

    public toFloat(value: any, def_value: number = 0.0, min?: number, max?: number): number {
        try {
            let result = parseFloat(value.replace(/,/g, '.'));
            result = this.isNaN(result) ? def_value : result;
            if (!this.isNaN(max) && result > (max || 0)) result = max || 0;
            if (!this.isNaN(min) && result < (min || 0)) result = min || 0;
            return result;
        } catch (err) {
            return def_value;
        }
    }

    public toInt(value: any, def_value: number = 0, min?: number, max?: number): number {
        try {
            let result = parseInt(value);
            result = this.isNaN(result) ? def_value : result;
            if (!this.isNaN(max) && result > (max || 0)) result = max || 0;
            if (!this.isNaN(min) && result < (min || 0)) result = min || 0;
            return result;
        } catch (err) {
            return def_value;
        }
    }

    // ------------------------------------------------------------------------
    //                      i s
    // ------------------------------------------------------------------------

    public isFunction(value: any): boolean {
        return typeof value == 'function';
    }

    public isObject(value: any): boolean {
        return value === Object(value);
    }

    public isArray(value: any): boolean {
        return !!Array.isArray
            ? Array.isArray(value)
            : value && typeof value == 'object' && typeof value.length == 'number' && toString.call(value) == '[object Array]' || false;
    }

    public isArguments(value: any): boolean {
        return value && typeof value == 'object' && typeof value.length == 'number' &&
            toString.call(value) == '[object Arguments]' || false;
    }

    public isBoolean(value: any): boolean {
        return value === true || value === false ||
            value && typeof value == 'object' && toString.call(value) == '[object Boolean]' || false;
    }

    public isString(value: any): boolean {
        return typeof value == 'string' ||
            value && typeof value == 'object' && toString.call(value) == '[object String]' || false;
    }

    public isNumber(value: any): boolean {
        return typeof value == 'number' ||
            value && typeof value == 'object' && toString.call(value) == '[object Number]' || false;
    }

    public isNaN(value: any): boolean {
        return isNaN(value);
    }

    static isDate(value: any): boolean {
        return value && typeof value == 'object' && toString.call(value) == '[object Date]' || false;
    }

    public isUndefined(value: any): boolean {
        return typeof value == 'undefined';
    }

    public isRegExp(value: any) {
        return value && typeof value == 'object' && toString.call(value) == '[object RegExp]' || false;
    }

    public isEmail(value: any): boolean {
        return this.isString(value) && this._validateEmail(value);
    }

    public isConstructor(f: any): boolean {
        try {
            return !!f.prototype && !!f.prototype.constructor.name;
        } catch (err) {
            return false;
        }
    }

    public className(item: any): string {
        try {
            if (!!item) {
                if (!!item.prototype && !!item.prototype.constructor) {
                    return item.prototype.constructor.name;
                } else if (!!item.constructor) {
                    return item.constructor.name;
                }
            }
        } catch (err) {
        }
        return '';
    }

    public funcName(func: any): string {
        try {
            if (!!func) {
                if (!!func.name) {
                    return func.name;
                } else if (!!func.prototype && !!func.prototype.name) {
                    return func.prototype.name;
                }
            }
        } catch (err) {
        }
        return '';
    }

    // ------------------------------------------------------------------------
    //                      u t i l s
    // ------------------------------------------------------------------------

    /**
     * Evaluate a script or an object
     * @param text
     * @return {*}
     */
    public evalScript(text: string): any {
        if (!!text && !!eval) {
            return eval.call(this, text);
        }
        return {};
    }

    public noCacheLink(url: string): string {
        if (url.indexOf("?") === -1)
            url += "?no_cache=" + new Date().getTime();
        else
            url += "&no_cache=" + new Date().getTime();
        return url;
    }

    /**
     * Invoke a function. Shortcut for "func.call(this, ...args)"
     */
    public funcInvoke(func: Function, ...args: any[]): any {
        if (this.isFunction(func)) {
            if (args.length === 0) {
                return func.call(this);
            } else {
                return func.call(this, ...args);
            }
        }
        return null;
    }

    /**
     * Delays a function for the given number of milliseconds, and then calls
     * it with the arguments supplied.
     * NOTE: user "clearTimeout" with funcDelay response to
     */
    public funcDelay(func: Function, wait: number, ...args: any[]): any {
        return setTimeout(function () {
            return func.call(null, ...args);
        }, wait);
    }

    /**
     * Loop with a delay until callback fun return true.
     * Sample usage:
     * <code>
     *    var count = 0;
     *    ly.this.funcLoop(function () {
     *       count++;
     *       console.log(count);
     *       return count == 3; // exit
     *   }, 1000).done(function () {
     *       console.log("DONE");
     *   });
     * </code>
     * @param func
     * @param wait
     * @param args
     * @return promise {{done: done}}
     */
    public funcLoop(func: Function, wait: number, ...args: any[]): any {
        let callback: Function;
        let timer = setInterval(function () {
            let exit = !!func.apply(null, args);
            if (exit) {
                clearInterval(timer);
                this.funcInvoke(callback);
            }
        }, wait || 300);

        return {
            done: function (done_callback: Function) {
                callback = done_callback;
            }
        };
    }

    /**
     * Returns a function that will be executed at most one time, no matter how
     * often you call it. Useful for lazy initialization.
     */
    public funcOnce(func: Function, ...args: any[]): any {
        let ran: boolean = false;
        let memo: any;
        return function () {
            if (ran) return memo;
            ran = true;
            memo = func.call(this, ...args);
            return memo;
        };
    }

    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds.
     * If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
     */
    public funcDebounce(context: any, func: Function, wait: number, immediate: boolean = false, ...args: any[]): any {
        const self = this;

        let timeout: any;
        //let context: any;
        let timestamp: number;
        let result: any;

        const later = function () {
            let last = random.now() - timestamp;

            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    // remove function from dictionary
                    self._removeDebounced(func_key);

                    result = func.apply(context, args);
                }
            }
        };

        const func_key = this._getFuncKey(context, func);
        console.log('lang.funcDebounce', 'func_key=' + func_key);
        const response_func = self._debounced_func.containsKey(func_key)
            ? self._debounced_func.get(func_key)
            : function () {
                //context = this;
                timestamp = random.now();
                let callNow = immediate && !timeout;
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                if (callNow) {
                    // remove function from dictionary
                    self._removeDebounced(func_key);

                    // execute function
                    result = func.apply(context, args);
                }

                return result;
            };

        this._addDebounced(func_key, response_func);

        return response_func;
    }


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private _validateEmail(email: string): boolean {
        try {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        } catch (err) {
            return false;
        }
    }

    private _removeDebounced(func_key: string) {
        if (this._debounced_func.containsKey(func_key)) {
            this._debounced_func.remove(func_key);
        }
    }

    private _addDebounced(func_key: string, func: Function) {
        if (!!func_key && !!func) {
            this._debounced_func.put(func_key, func);
        }
    }

    private _getFuncKey(context: any, func: Function): string {
        if (!!context && !!func) {
            const uid: string = !!context.uid ? context.uid : this.toString(context);
            const func_name: string = this.funcName(func);
            console.log('lang._getFuncKey', 'uid=' + uid, 'func_name=' + func_name);
            if (!!uid && !!func_name) {
                return uid + '.' + func_name;
            }
        }
        return '';
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------

    private static __instance: langClass;

    public static instance(): langClass {
        if (null == langClass.__instance) {
            langClass.__instance = new langClass();
        }
        return langClass.__instance;
    }


}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

const lang: langClass = langClass.instance();
export default lang;


