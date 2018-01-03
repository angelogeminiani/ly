/**
 * Utility class
 */
import random from "./random";

export default class lang {


    // ------------------------------------------------------------------------
    //                      t o
    // ------------------------------------------------------------------------

    static toString(value: any): string {
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

    static toArray<T>(value: any | any[]) {
        return !!value
            ? lang.isArray(value) ? value as Array<T> : [value as T]
            : [];
    }

    static toBoolean(value: any, def_val: boolean): boolean {
        return !!value
            ? value !== 'false' && value !== '0'
            : def_val;
    }

    static toFloat(value: any, def_value: number = 0.0, min?: number, max?: number): number {
        try {
            let result = parseFloat(value.replace(/,/g, '.'));
            result = lang.isNaN(result) ? def_value : result;
            if (!lang.isNaN(max) && result > (max || 0)) result = max || 0;
            if (!lang.isNaN(min) && result < (min || 0)) result = min || 0;
            return result;
        } catch (err) {
            return def_value;
        }
    }

    static toInt(value: any, def_value: number = 0, min?: number, max?: number): number {
        try {
            let result = parseInt(value);
            result = lang.isNaN(result) ? def_value : result;
            if (!lang.isNaN(max) && result > (max || 0)) result = max || 0;
            if (!lang.isNaN(min) && result < (min || 0)) result = min || 0;
            return result;
        } catch (err) {
            return def_value;
        }
    }

    // ------------------------------------------------------------------------
    //                      i s
    // ------------------------------------------------------------------------

    static isFunction(value: any): boolean {
        return typeof value == 'function';
    }

    static isObject(value: any): boolean {
        return value === Object(value);
    }

    static isArray(value: any): boolean {
        return !!Array.isArray
            ? Array.isArray(value)
            : value && typeof value == 'object' && typeof value.length == 'number' && toString.call(value) == '[object Array]' || false;
    }

    static isArguments(value: any): boolean {
        return value && typeof value == 'object' && typeof value.length == 'number' &&
            toString.call(value) == '[object Arguments]' || false;
    }

    static isBoolean(value: any): boolean {
        return value === true || value === false ||
            value && typeof value == 'object' && toString.call(value) == '[object Boolean]' || false;
    }

    static isString(value: any): boolean {
        return typeof value == 'string' ||
            value && typeof value == 'object' && toString.call(value) == '[object String]' || false;
    }

    static isNumber(value: any): boolean {
        return typeof value == 'number' ||
            value && typeof value == 'object' && toString.call(value) == '[object Number]' || false;
    }

    static isNaN(value: any): boolean {
        return isNaN(value);
    }

    static isDate(value: any): boolean {
        return value && typeof value == 'object' && toString.call(value) == '[object Date]' || false;
    }

    static isUndefined(value: any): boolean {
        return typeof value == 'undefined';
    }

    static isRegExp(value: any) {
        return value && typeof value == 'object' && toString.call(value) == '[object RegExp]' || false;
    }

    static isEmail(value: any): boolean {
        return lang.isString(value) && lang._validateEmail(value);
    }

    static isConstructor(f: any): boolean {
        try {
            return !!f.prototype && !!f.prototype.constructor.name;
        } catch (err) {
            return false;
        }
    }

    // ------------------------------------------------------------------------
    //                      u t i l s
    // ------------------------------------------------------------------------

    /**
     * Evaluate a script or an object
     * @param text
     * @return {*}
     */
    static evalScript(text: string): any {
        if (!!text && !!eval) {
            return eval.call(this, text);
        }
        return {};
    }

    static noCacheLink(url: string): string {
        if (url.indexOf("?") === -1)
            url += "?no_cache=" + new Date().getTime();
        else
            url += "&no_cache=" + new Date().getTime();
        return url;
    }

    /**
     * Invoke a function. Shortcut for "func.call(this, ...args)"
     */
    static funcInvoke(func: Function, ...args: any[]): any {
        if (lang.isFunction(func)) {
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
    static funcDelay(func: Function, wait: number, ...args: any[]): any {
        return setTimeout(function () {
            return func.call(null, ...args);
        }, wait);
    }

    /**
     * Loop with a delay until callback fun return true.
     * Sample usage:
     * <code>
     *    var count = 0;
     *    ly.lang.funcLoop(function () {
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
    static funcLoop(func: Function, wait: number, ...args: any[]): any {
        let callback: Function;
        let timer = setInterval(function () {
            let exit = !!func.apply(null, args);
            if (exit) {
                clearInterval(timer);
                lang.funcInvoke(callback);
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
    static funcOnce(func: Function, ...args: any[]): any {
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
    static funcDebounce(context: any, func: Function, wait: number, immediate: boolean = false, ...args: any[]): any {
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
                    result = func.apply(context, args);
                    //context = null;
                }
            }
        };

        return function () {
            //context = this;
            timestamp = random.now();
            let callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                //context = null;
            }

            return result;
        };
    }


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private static _validateEmail(email: string): boolean {
        try {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        } catch (err) {
            return false;
        }
    }


}


