/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random__ = __webpack_require__(3);
/**
 * Utility class
 */

var lang = /** @class */ (function () {
    function lang() {
    }
    // ------------------------------------------------------------------------
    //                      t o
    // ------------------------------------------------------------------------
    lang.toString = function (value) {
        switch (typeof value) {
            case 'string':
            case 'number':
            case 'boolean':
                return value + '';
            case 'object':
                try {
                    // null is an object but is falsy. Swallow it.
                    return value === null ? '' : JSON.stringify(value);
                }
                catch (jsonError) {
                    return '{...}';
                }
            default:
                // Anything else will be replaced with an empty string
                // For example: undefined, Symbol, etc.
                return '';
        }
    };
    lang.toArray = function (value) {
        return !!value
            ? lang.isArray(value) ? value : [value]
            : [];
    };
    lang.toBoolean = function (value, def_val) {
        return !!value
            ? value !== 'false' && value !== '0'
            : def_val;
    };
    lang.toFloat = function (value, def_value, min, max) {
        if (def_value === void 0) { def_value = 0.0; }
        try {
            var result = parseFloat(value.replace(/,/g, '.'));
            result = lang.isNaN(result) ? def_value : result;
            if (!lang.isNaN(max) && result > (max || 0))
                result = max || 0;
            if (!lang.isNaN(min) && result < (min || 0))
                result = min || 0;
            return result;
        }
        catch (err) {
            return def_value;
        }
    };
    lang.toInt = function (value, def_value, min, max) {
        if (def_value === void 0) { def_value = 0; }
        try {
            var result = parseInt(value);
            result = lang.isNaN(result) ? def_value : result;
            if (!lang.isNaN(max) && result > (max || 0))
                result = max || 0;
            if (!lang.isNaN(min) && result < (min || 0))
                result = min || 0;
            return result;
        }
        catch (err) {
            return def_value;
        }
    };
    // ------------------------------------------------------------------------
    //                      i s
    // ------------------------------------------------------------------------
    lang.isFunction = function (value) {
        return typeof value == 'function';
    };
    lang.isObject = function (value) {
        return value === Object(value);
    };
    lang.isArray = function (value) {
        return !!Array.isArray
            ? Array.isArray(value)
            : value && typeof value == 'object' && typeof value.length == 'number' && toString.call(value) == '[object Array]' || false;
    };
    lang.isArguments = function (value) {
        return value && typeof value == 'object' && typeof value.length == 'number' &&
            toString.call(value) == '[object Arguments]' || false;
    };
    lang.isBoolean = function (value) {
        return value === true || value === false ||
            value && typeof value == 'object' && toString.call(value) == '[object Boolean]' || false;
    };
    lang.isString = function (value) {
        return typeof value == 'string' ||
            value && typeof value == 'object' && toString.call(value) == '[object String]' || false;
    };
    lang.isNumber = function (value) {
        return typeof value == 'number' ||
            value && typeof value == 'object' && toString.call(value) == '[object Number]' || false;
    };
    lang.isNaN = function (value) {
        return isNaN(value);
    };
    lang.isDate = function (value) {
        return value && typeof value == 'object' && toString.call(value) == '[object Date]' || false;
    };
    lang.isUndefined = function (value) {
        return typeof value == 'undefined';
    };
    lang.isRegExp = function (value) {
        return value && typeof value == 'object' && toString.call(value) == '[object RegExp]' || false;
    };
    lang.isEmail = function (value) {
        return lang.isString(value) && lang._validateEmail(value);
    };
    lang.isConstructor = function (f) {
        try {
            return !!f.prototype && !!f.prototype.constructor.name;
        }
        catch (err) {
            return false;
        }
    };
    lang.className = function (item) {
        try {
            if (!!item) {
                if (!!item.prototype && !!item.prototype.constructor) {
                    return item.prototype.constructor.name;
                }
                else if (!!item.constructor) {
                    return item.constructor.name;
                }
            }
        }
        catch (err) {
        }
        return '';
    };
    // ------------------------------------------------------------------------
    //                      u t i l s
    // ------------------------------------------------------------------------
    /**
     * Evaluate a script or an object
     * @param text
     * @return {*}
     */
    lang.evalScript = function (text) {
        if (!!text && !!eval) {
            return eval.call(this, text);
        }
        return {};
    };
    lang.noCacheLink = function (url) {
        if (url.indexOf("?") === -1)
            url += "?no_cache=" + new Date().getTime();
        else
            url += "&no_cache=" + new Date().getTime();
        return url;
    };
    /**
     * Invoke a function. Shortcut for "func.call(this, ...args)"
     */
    lang.funcInvoke = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (lang.isFunction(func)) {
            if (args.length === 0) {
                return func.call(this);
            }
            else {
                return func.call.apply(func, [this].concat(args));
            }
        }
        return null;
    };
    /**
     * Delays a function for the given number of milliseconds, and then calls
     * it with the arguments supplied.
     * NOTE: user "clearTimeout" with funcDelay response to
     */
    lang.funcDelay = function (func, wait) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setTimeout(function () {
            return func.call.apply(func, [null].concat(args));
        }, wait);
    };
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
    lang.funcLoop = function (func, wait) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var callback;
        var timer = setInterval(function () {
            var exit = !!func.apply(null, args);
            if (exit) {
                clearInterval(timer);
                lang.funcInvoke(callback);
            }
        }, wait || 300);
        return {
            done: function (done_callback) {
                callback = done_callback;
            }
        };
    };
    /**
     * Returns a function that will be executed at most one time, no matter how
     * often you call it. Useful for lazy initialization.
     */
    lang.funcOnce = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var ran = false;
        var memo;
        return function () {
            if (ran)
                return memo;
            ran = true;
            memo = func.call.apply(func, [this].concat(args));
            return memo;
        };
    };
    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds.
     * If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
     */
    lang.funcDebounce = function (context, func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        var timeout;
        //let context: any;
        var timestamp;
        var result;
        var later = function () {
            var last = __WEBPACK_IMPORTED_MODULE_0__random__["a" /* default */].now() - timestamp;
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    //context = null;
                }
            }
        };
        return function () {
            //context = this;
            timestamp = __WEBPACK_IMPORTED_MODULE_0__random__["a" /* default */].now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                //context = null;
            }
            return result;
        };
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    lang._validateEmail = function (email) {
        try {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        catch (err) {
            return false;
        }
    };
    return lang;
}());
/* harmony default export */ __webpack_exports__["a"] = (lang);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dictionary; });
var Dictionary = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Dictionary(o) {
        // ------------------------------------------------------------------------
        //                      f i e l d s
        // ------------------------------------------------------------------------
        this._items = {};
        this._count = 0;
        if (!!o) {
            for (var key in o) {
                if (o.hasOwnProperty(key)) {
                    this.put(key, o[key]);
                }
            }
        }
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    Dictionary.prototype.put = function (key, value) {
        this._items[key] = value;
        this._count++;
    };
    Dictionary.prototype.get = function (key) {
        return this._items[key];
    };
    Dictionary.prototype.containsKey = function (key) {
        return this._items.hasOwnProperty(key);
    };
    Dictionary.prototype.count = function () {
        return this._count;
    };
    Dictionary.prototype.isEmpty = function () {
        return this._count === 0;
    };
    Dictionary.prototype.keys = function () {
        var Keys = [];
        // tslint:disable-next-line:forin
        for (var key in this._items) {
            Keys.push(key);
        }
        return Keys;
    };
    Dictionary.prototype.remove = function (key) {
        var val = this._items[key];
        delete this._items[key];
        this._count--;
        return val;
    };
    Dictionary.prototype.values = function () {
        var values = [];
        // tslint:disable-next-line:forin
        for (var key in this._items) {
            values.push(this._items[key]);
        }
        return values;
    };
    Dictionary.prototype.clear = function () {
        if (!this.isEmpty()) {
            this._items = {};
        }
    };
    return Dictionary;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random__ = __webpack_require__(3);
/**
 * Extends standard console
 */

var console_ext = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function console_ext() {
    }
    Object.defineProperty(console_ext.prototype, "uid", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._uid;
        },
        set: function (value) {
            this._uid = value;
        },
        enumerable: true,
        configurable: true
    });
    console_ext.prototype.error = function (scope, error) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        console.error.apply(console, ["[" + this.uid + "] " + scope, error].concat(args));
    };
    ;
    console_ext.prototype.warn = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.error.apply(console, ["[" + this.uid + "] " + scope].concat(args));
    };
    ;
    console_ext.prototype.log = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log.apply(console, ["[" + this.uid + "] " + scope].concat(args));
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    console_ext.prototype.init = function () {
        this.uid = __WEBPACK_IMPORTED_MODULE_0__random__["a" /* default */].guid();
    };
    console_ext.instance = function () {
        if (null == console_ext.__instance) {
            console_ext.__instance = new console_ext();
        }
        return console_ext.__instance;
    };
    return console_ext;
}());
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (console_ext.instance());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var random = /** @class */ (function () {
    function random() {
    }
    // ------------------------------------------------------------------------
    //                      random and GUID
    // ------------------------------------------------------------------------
    // A (possibly faster) way to get the current timestamp as an integer.
    random.now = function () {
        return !!Date.now ? Date.now() : new Date().getTime();
    };
    random.rnd = function (arg1, arg2) {
        try {
            if (null === arg2) {
                return Math.random() * arg1;
            }
            else {
                return Math.floor(Math.random() * (arg2 || arg1)) + arg1;
            }
        }
        catch (err) {
        }
        return Math.random();
    };
    random.guid = function () {
        return random._s4() + random._s4() + '-' + random._s4() + '-' + random._s4() + '-' +
            random._s4() + '-' + random._s4() + random._s4() + random._s4();
    };
    random.s4 = function () {
        return random._s4();
    };
    random.id = function () {
        return random._s4() + random._s4();
    };
    random.uniqueId = function (prefix) {
        var id = ++random._id_counter + '';
        return prefix ? prefix + id : id;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    random._s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    random._id_counter = 0;
    return random;
}());
/* harmony default export */ __webpack_exports__["a"] = (random);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_lang__ = __webpack_require__(0);
/**
 * Browser Utility class
 */

var browser = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function browser() {
        this.init();
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    browser.prototype.isReady = function () {
        return !!document && !!navigator && !!window;
    };
    browser.prototype.language = function () {
        if (this.isReady()) {
            return navigator.language;
        }
        return '';
    };
    browser.prototype.lang = function () {
        return this.language().split('-')[0];
    };
    browser.prototype.location = function () {
        return window.location.href;
    };
    browser.prototype.hasStorage = function () {
        return (typeof (Storage) !== "undefined");
    };
    browser.prototype.isMobile = function () {
        if (this.isReady()) {
            var check_1 = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                    check_1 = true;
            })(navigator.userAgent || navigator.vendor);
            return check_1;
        }
        return false;
    };
    browser.prototype.isPushStateAvailable = function () {
        return !!(typeof window !== 'undefined' &&
            window.history &&
            window.history.pushState);
    };
    browser.prototype.isHashChangeAvailable = function () {
        return !!(typeof window !== 'undefined' &&
            ('onhashchange' in window));
    };
    browser.prototype.getParameterByName = function (name, url) {
        url = url || location.search;
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    // ------------------------------------------------------------------------
    //                      e v e n t s
    // ------------------------------------------------------------------------
    browser.prototype.onResize = function (callback, debounce) {
        if (debounce === void 0) { debounce = 200; }
        this._on_resize_callback = callback;
        this._debounce_wait = debounce;
        //-- event hooks --//
        if (!!window) {
            if (!!this._debounce_func) {
                window.removeEventListener("resize", this._debounce_func);
            }
            this._debounce_func = __WEBPACK_IMPORTED_MODULE_0__commons_lang__["a" /* default */].funcDebounce(this, this._resize, this._debounce_wait);
            window.addEventListener("resize", this._debounce_func);
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    browser.prototype.init = function () {
    };
    browser.prototype.doResize = function (w, h) {
        if (!!this._on_resize_callback) {
            this._on_resize_callback(w, h);
        }
    };
    browser.prototype._resize = function () {
        this.doResize(window.innerWidth, window.innerHeight);
    };
    browser.instance = function () {
        if (null == browser.__instance) {
            browser.__instance = new browser();
        }
        return browser.__instance;
    };
    return browser;
}());
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (browser.instance());


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Events__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BaseObject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collections_Dictionary__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * Class that emit events with a scope.
 */
var EventEmitter = /** @class */ (function (_super) {
    __extends(EventEmitter, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function EventEmitter() {
        var _this = _super.call(this) || this;
        _this._listeners = new __WEBPACK_IMPORTED_MODULE_2__collections_Dictionary__["a" /* Dictionary */]();
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    EventEmitter.prototype.on = function (scope, eventName, listener) {
        var key = EventEmitter.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new __WEBPACK_IMPORTED_MODULE_0__Events__["a" /* default */]());
        }
        this._listeners.get(key).on(eventName, listener.bind(scope));
    };
    EventEmitter.prototype.once = function (scope, eventName, listener) {
        var key = EventEmitter.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new __WEBPACK_IMPORTED_MODULE_0__Events__["a" /* default */]());
        }
        this._listeners.get(key).once(eventName, listener.bind(scope));
    };
    EventEmitter.prototype.off = function (scope, eventName) {
        var key = EventEmitter.key(scope);
        if (this._listeners.containsKey(key)) {
            this._listeners.get(key).off(eventName);
        }
    };
    EventEmitter.prototype.clear = function () {
        if (!!this._listeners) {
            var keys = this._listeners.keys();
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (this._listeners.containsKey(key)) {
                    this._listeners.get(key).clear();
                }
            }
        }
    };
    EventEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!!this._listeners) {
            var keys = this._listeners.keys();
            for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                var key = keys_2[_a];
                if (this._listeners.containsKey(key)) {
                    (_b = this._listeners.get(key)).emit.apply(_b, [eventName].concat(args));
                }
            }
        }
        var _b;
    };
    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------
    EventEmitter.key = function (scope) {
        try {
            return scope.uid;
        }
        catch (err) {
            console.warn("ApplicationEvents.key()", "BINDING EVENT ON DEFAULT KEY!");
            return '_default';
        }
    };
    return EventEmitter;
}(__WEBPACK_IMPORTED_MODULE_1__BaseObject__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (EventEmitter);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SelectorType */
/* unused harmony export SelectorParser */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commons_strings__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commons_lang__ = __webpack_require__(0);



var SelectorType;
(function (SelectorType) {
    SelectorType[SelectorType["ID"] = 0] = "ID";
    SelectorType[SelectorType["CLASS"] = 1] = "CLASS";
    SelectorType[SelectorType["TAG"] = 2] = "TAG";
    SelectorType[SelectorType["ATTR"] = 3] = "ATTR";
})(SelectorType || (SelectorType = {}));
/**
 * Parser for CSS selectors.
 */
var SelectorParser = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function SelectorParser(selector) {
        this._selector = selector;
        this.parse();
    }
    Object.defineProperty(SelectorParser.prototype, "raw", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._selector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorParser.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorParser.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorParser.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectorParser.prototype, "operator", {
        get: function () {
            return this._operator;
        },
        enumerable: true,
        configurable: true
    });
    SelectorParser.prototype.match = function (elem) {
        try {
            if (!!elem) {
                return this.matchElement(elem);
            }
        }
        catch (err) {
        }
        return false;
    };
    SelectorParser.prototype.matchElement = function (elem) {
        if (this.type === SelectorType.TAG) {
            return elem.tagName === this.value;
        }
        else if (this.type === SelectorType.ID) {
            return elem.id == this.value;
        }
        else if (this.type === SelectorType.CLASS) {
            var classes = elem.className.split(" ") || [];
            return classes.indexOf(this.value) > -1;
        }
        else if (this.type === SelectorType.ATTR) {
            if (!!this.operator) {
                if (elem.hasAttribute(this.name)) {
                    var attr_value = elem.getAttribute(this.name) || '';
                    if (this.operator === "=") {
                        return attr_value === this.value;
                    }
                    else if (this.operator === "~=") {
                        // attribute value is a whitespace-separated list of words, one of which is exactly "val" (attribute="val1 val2")
                        return attr_value.split(" ").indexOf(this.value) > -1;
                    }
                    else if (this.operator === "|=") {
                        // attribute value equals "val" or starts with
                        return __WEBPACK_IMPORTED_MODULE_1__commons_strings__["a" /* default */].startWith(attr_value, this.value);
                    }
                }
            }
            else {
                // check only attribute
                return elem.hasAttribute(this.value);
            }
        }
        return false;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    SelectorParser.prototype.parse = function () {
        if (!!this._selector) {
            // defaults
            this._operator = '';
            // check type and parse values
            if (SelectorParser.isSelectorID(this._selector)) {
                // selector id
                this._type = SelectorType.ID;
                this._name = "id";
                this._value = this._selector.substring(1);
            }
            else if (SelectorParser.isSelectorCLASS(this._selector)) {
                // selector class
                this._type = SelectorType.CLASS;
                this._name = "class";
                this._value = this._selector.substring(1);
            }
            else if (SelectorParser.isSelectorATTR(this._selector)) {
                // selector attribute [attribute]='value'
                this._type = SelectorType.ATTR;
                var selector = __WEBPACK_IMPORTED_MODULE_1__commons_strings__["a" /* default */].replaceAll(["'", "[", "]"], "", this._selector);
                // [att=val] [att~=val] [att|=val]
                if (selector.indexOf("~=") > -1) {
                    // [att~=val] - Represents an element with the att attribute whose value is a whitespace-separated list of words, one of which is exactly "val"
                    var tokens = selector.split("~=");
                    this._name = tokens[0];
                    this._value = tokens[1];
                    this._operator = '~=';
                }
                else if (selector.indexOf("|=") > -1) {
                    // [att|=val] - Represents an element with the att attribute, its value either being exactly "val" or beginning with "val" immediately followed by "-" (U+002D).
                    var tokens = selector.split("|=");
                    this._name = tokens[0];
                    this._value = tokens[1];
                    this._operator = '|=';
                }
                else if (selector.indexOf("=") > -1) {
                    // [att=val]
                    var tokens = selector.split("=");
                    this._name = tokens[0];
                    this._value = tokens[1];
                    this._operator = '=';
                }
                else {
                    // [attr]
                    this._name = selector;
                    this._value = selector;
                    this._operator = '';
                }
            }
            else {
                // selector tag name
                this._type = SelectorType.TAG;
                this._name = this._selector;
                this._value = this._selector;
            }
        }
    };
    SelectorParser.isSelectorID = function (selector) {
        return !!selector ? __WEBPACK_IMPORTED_MODULE_1__commons_strings__["a" /* default */].startWith(selector, "#") : false;
    };
    SelectorParser.isSelectorCLASS = function (selector) {
        return !!selector ? __WEBPACK_IMPORTED_MODULE_1__commons_strings__["a" /* default */].startWith(selector, ".") : false;
    };
    SelectorParser.isSelectorATTR = function (selector) {
        return !!selector ? __WEBPACK_IMPORTED_MODULE_1__commons_strings__["a" /* default */].startWith(selector, "[") && selector.indexOf("]") > -1 : false;
    };
    return SelectorParser;
}());

/**
 * Default Export class.
 */
var dom = /** @class */ (function () {
    function dom() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    dom.parse = function (text) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, "text/html");
        return doc;
    };
    dom.newElement = function (inner_html, append_to_selector) {
        if (inner_html === void 0) { inner_html = ''; }
        var elem;
        if (!!inner_html) {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = inner_html;
            if (wrapper.childElementCount > 1) {
                elem = wrapper;
            }
            else {
                elem = wrapper.firstChild;
            }
        }
        elem = elem || document.createElement("div");
        if (!!append_to_selector) {
            var parent_1 = dom.get(append_to_selector);
            if (parent_1.length > 0) {
                parent_1[0].appendChild(elem);
            }
        }
        return elem;
    };
    dom.getFirst = function (selector, target) {
        if (selector === void 0) { selector = ''; }
        var response = dom.get(selector, target);
        return response.length > 0 ? response[0] : null;
    };
    dom.getLast = function (selector, target) {
        if (selector === void 0) { selector = ''; }
        var response = dom.get(selector, target);
        return response.length > 0 ? response[response.length - 1] : null;
    };
    dom.get = function (selector, target) {
        if (selector === void 0) { selector = ''; }
        if (!!selector) {
            var selector_parser = new SelectorParser(selector);
            if (!!target) {
                return dom.getElementFromParent(target, selector_parser);
            }
            else {
                return dom.getElementFromDocument(selector_parser);
            }
        }
        return [];
    };
    dom.forEachChild = function (elem, func, deep) {
        if (deep === void 0) { deep = false; }
        if (__WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].isFunction(func) && !!elem && !!elem.children) {
            var count = elem.children.length;
            for (var i = 0; i < count; i++) {
                var child = elem.children.item(i);
                if (!!child) {
                    func(child);
                    if (deep && child.children.length > 0) {
                        // recursive
                        dom.forEachChild(child, func, deep);
                    }
                }
            }
        }
    };
    dom.map = function (elem, func, deep) {
        if (deep === void 0) { deep = false; }
        var response = new Array();
        if (__WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].isFunction(func) && !!elem) {
            var count = elem.children.length;
            for (var i = 0; i < count; i++) {
                var child = elem.children.item(i);
                if (!!child) {
                    if (func(child)) {
                        response.push(child);
                    }
                    if (deep && child.children.length > 0) {
                        // recursive
                        response.push.apply(response, dom.map(child, func, deep));
                    }
                }
            }
        }
        return response;
    };
    dom.isInput = function (elem) {
        return !!elem
            ? elem.tagName.toLowerCase() === "input"
            : false;
    };
    dom.isInputButton = function (elem) {
        return !!elem
            ? dom.isInput(elem) && elem.getAttribute("type") === "button"
            : false;
    };
    dom.isInputText = function (elem) {
        return !!elem
            ? dom.isInput(elem) && elem.getAttribute("type") === "text"
            : false;
    };
    dom.isInputCheck = function (elem) {
        return !!elem
            ? dom.isInput(elem) && elem.getAttribute("type") === "checkbox"
            : false;
    };
    dom.isTextArea = function (elem) {
        return !!elem
            ? elem.tagName.toLowerCase() === "textarea"
            : false;
    };
    dom.getValue = function (elem) {
        if (!!elem) {
            if (dom.isInput(elem)) {
                var e = elem;
                if (!!e) {
                    var type = e.getAttribute("type");
                    if (type === "checkbox") {
                        return e.checked;
                    }
                    else if (!!e.value) {
                        return e.value;
                    }
                }
            }
            else if (dom.isTextArea(elem)) {
                var e = elem;
                return !!e ? e.value : null;
            }
        }
        return null;
    };
    dom.setValue = function (elem, value) {
        if (!!elem) {
            if (dom.isInput(elem)) {
                var e = elem;
                if (!!e) {
                    var type = e.getAttribute("type");
                    if (type === "checkbox") {
                        e.checked = value;
                    }
                    else {
                        e.value = value;
                    }
                }
            }
            else if (dom.isTextArea(elem)) {
                var e = elem;
                e.value = value;
            }
            else {
                elem.innerHTML = value;
            }
        }
    };
    dom.classAdd = function (elem, class_name) {
        if (!!elem && !!elem.classList) {
            var classes = __WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].toArray(class_name);
            for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
                var aclass = classes_1[_i];
                if (!elem.classList.contains(aclass)) {
                    elem.classList.add(aclass);
                }
            }
            return true;
        }
        return false;
    };
    dom.classRemove = function (elem, class_name) {
        if (!!elem && !!elem.classList) {
            var classes = __WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].toArray(class_name);
            for (var _i = 0, classes_2 = classes; _i < classes_2.length; _i++) {
                var aclass = classes_2[_i];
                if (elem.classList.contains(aclass)) {
                    elem.classList.remove(aclass);
                }
            }
            return true;
        }
        return false;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    dom.getElementFromDocument = function (selector) {
        var list = [];
        if (!!selector && __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isReady()) {
            if (selector.type === SelectorType.ID) {
                var result = document.getElementById(selector.value);
                if (!!result) {
                    list.push(result);
                }
            }
            else if (selector.type === SelectorType.CLASS) {
                var result = document.getElementsByClassName(selector.value);
                var count = result.length;
                for (var i = 0; i < count; i++) {
                    list.push(result.item(i));
                }
            }
            else if (selector.type === SelectorType.TAG) {
                var result = document.getElementsByTagName(selector.value);
                var count = result.length;
                for (var i = 0; i < count; i++) {
                    list.push(result.item(i));
                }
            }
            else if (selector.type === SelectorType.ATTR) {
                var children = document.body.children;
                for (var i = 0; i < children.length; i++) {
                    var elem = children.item(i);
                    var found = dom.getElementFromParent(elem, selector);
                    if (found.length > 0) {
                        list.push.apply(list, found);
                    }
                }
            }
        }
        return list;
    };
    dom.getElementFromParent = function (elem, selector) {
        var list = new Array();
        if (!!selector && __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isReady()) {
            list.push.apply(list, dom.map(elem, function (child) {
                return selector.match(child);
            }, true));
        }
        return list;
    };
    return dom;
}());
/* harmony default export */ __webpack_exports__["a"] = (dom);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collections_Dictionary__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lang__ = __webpack_require__(0);


/**
 * Events controller.
 *
 * <code>
 *
 * import {Events} from "./events/Events";
 *
 * class MyEmitter extends Events{}
 *
 * let myEmitter = new MyEmitter();
 * myEmitter.on('event', () => {
 *   console.log('event occured')
 * });
 *
 * myEmitter.emit('event');
 *
 * </code>
 *
 *
 */
var Events = /** @class */ (function () {
    function Events() {
        // ------------------------------------------------------------------------
        //                      C O N S T
        // ------------------------------------------------------------------------
        // ------------------------------------------------------------------------
        //                      f i e l d s
        // ------------------------------------------------------------------------
        this._events = new __WEBPACK_IMPORTED_MODULE_0__collections_Dictionary__["a" /* Dictionary */]();
        this._maxListeners = 0;
    }
    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------
    Events.prototype.getMaxListeners = function () {
        return this._maxListeners === 0 ? Events.DEFAULT_MAX_LISTENERS : this._maxListeners;
    };
    Events.prototype.setMaxListeners = function (limit) {
        this._maxListeners = limit;
        return this;
    };
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    Events.prototype.addListener = function (eventName, listener) {
        return this.on(eventName, listener);
    };
    Events.prototype.on = function (eventName, listener) {
        this._registerEvent(eventName, listener, false);
        return this;
    };
    Events.prototype.once = function (eventName, listener) {
        this._registerEvent(eventName, listener, true);
        return this;
    };
    Events.prototype.off = function (event_names, listener) {
        var names = __WEBPACK_IMPORTED_MODULE_1__lang__["a" /* default */].isArray(event_names)
            ? event_names
            : !!event_names ? [event_names] : [];
        if (!!listener) {
            for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                var name_1 = names_1[_i];
                this.removeListener(name_1, listener);
            }
        }
        else {
            if (names.length > 0) {
                this.removeAllListeners(names);
            }
            else {
                this.removeAllListeners();
            }
        }
        return this;
    };
    Events.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var listeners = this._events.get(eventName);
        var listenerCount = this.listenerCount(eventName);
        if (listeners) {
            listeners.map(function (listener) { return listener.apply(void 0, args); });
        }
        return listenerCount !== 0;
    };
    Events.prototype.eventNames = function () {
        return this._events.keys();
    };
    Events.prototype.listeners = function (eventName) {
        return this._events.get(eventName);
    };
    Events.prototype.listenerCount = function (eventName) {
        var listeners = this._events.get(eventName);
        return listeners === undefined ? 0 : listeners.length;
    };
    Events.prototype.removeAllListeners = function (eventNames) {
        var _this = this;
        if (!eventNames) {
            eventNames = this._events.keys();
        }
        eventNames.forEach(function (eventName) { return _this._events.remove(eventName); });
        return this;
    };
    Events.prototype.removeListener = function (eventName, listener) {
        var listeners = this.listeners(eventName);
        var filtered_listeners = !!listeners
            ? listeners.filter(function (item) { return item === listener; }) // filter only valid
            : [];
        this._events.put(eventName, filtered_listeners);
        return this;
    };
    Events.prototype.clear = function () {
        this._events.clear();
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Events.prototype._registerEvent = function (eventName, listener, type) {
        if (this._listenerLimitReached(eventName)) {
            console.warn("Maximum listener reached, new Listener not added");
            return;
        }
        if (type === true) {
            listener = this._createOnceListener(listener, eventName);
        }
        var listeners = Events._createListeners(listener, this.listeners(eventName));
        this._events.put(eventName, listeners);
        return;
    };
    Events.prototype._createOnceListener = function (listener, eventName) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.removeListener(eventName, listener);
            return listener.apply(void 0, args);
        };
    };
    Events.prototype._listenerLimitReached = function (eventName) {
        return this.listenerCount(eventName) >= this.getMaxListeners();
    };
    Events._createListeners = function (listener, listeners) {
        if (!listeners) {
            listeners = [];
        }
        listeners.push(listener);
        return listeners;
    };
    Events.DEFAULT_MAX_LISTENERS = 10; // max listener for each event name
    return Events;
}());
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (Events);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_lang__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commons_format__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commons_strings__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commons_objects__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commons_random__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__view_browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_cookies__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__view_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__view_i18n__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__commons_collections_Dictionary__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__commons_events_Events__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__commons_events_EventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__net_HttpClient__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__view_components_Component__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__application_Application__ = __webpack_require__(21);
//-- static --//









//-- classes --//




//-- views --//

//-- singleton --//

// ------------------------------------------------------------------------
//                      l y
// ------------------------------------------------------------------------
var ly = {
    lang: __WEBPACK_IMPORTED_MODULE_0__commons_lang__["a" /* default */],
    format: __WEBPACK_IMPORTED_MODULE_1__commons_format__["a" /* default */],
    strings: __WEBPACK_IMPORTED_MODULE_2__commons_strings__["a" /* default */],
    objects: __WEBPACK_IMPORTED_MODULE_3__commons_objects__["a" /* default */],
    random: __WEBPACK_IMPORTED_MODULE_4__commons_random__["a" /* default */],
    browser: __WEBPACK_IMPORTED_MODULE_5__view_browser__["a" /* default */],
    cookies: __WEBPACK_IMPORTED_MODULE_6__view_cookies__["a" /* default */],
    dom: __WEBPACK_IMPORTED_MODULE_7__view_dom__["a" /* default */],
    i18n: __WEBPACK_IMPORTED_MODULE_8__view_i18n__["a" /* default */],
    Events: __WEBPACK_IMPORTED_MODULE_10__commons_events_Events__["a" /* default */],
    EventEmitter: __WEBPACK_IMPORTED_MODULE_11__commons_events_EventEmitter__["a" /* default */],
    Dictionary: __WEBPACK_IMPORTED_MODULE_9__commons_collections_Dictionary__["a" /* Dictionary */],
    HttpClient: __WEBPACK_IMPORTED_MODULE_12__net_HttpClient__["a" /* HttpClient */],
    //-- v i e w --//
    Component: __WEBPACK_IMPORTED_MODULE_13__view_components_Component__["a" /* default */],
    //-- s i n g l e t o n --//
    Application: __WEBPACK_IMPORTED_MODULE_14__application_Application__["a" /* default */]
};
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (ly);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lang__ = __webpack_require__(0);

var strings = /** @class */ (function () {
    function strings() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    /**
     * Replace all occurrences of 'find' parameter with 'replace' parameter in a string 'str'.
     * @param {string[] | string} find Parameter to find
     * @param {string} replace Replace value
     * @param {string} str Source string
     * @return {string} String with replaced values
     */
    strings.replaceAll = function (find, replace, str) {
        var rep_array = [];
        if (__WEBPACK_IMPORTED_MODULE_0__lang__["a" /* default */].isString(find)) {
            rep_array.push(find);
        }
        else {
            rep_array.push.apply(rep_array, find);
        }
        var result = str;
        for (var i = 0; i < rep_array.length; i++) {
            result = strings._replaceAll(rep_array[i], replace, result);
        }
        return result;
    };
    strings.endWith = function (str, suffix) {
        if (str === null || suffix === null)
            return false;
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    strings.startWith = function (str, prefix) {
        if (str === null || prefix === null)
            return false;
        return str.indexOf(prefix) === 0;
    };
    strings.fillLeft = function (value, fill, size) {
        while (value.length < size) {
            value = fill + value;
        }
        return value;
    };
    strings.fillRight = function (value, fill, size) {
        while (value.length < size) {
            value = value + fill;
        }
        return value;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    strings._escapeRegExp = function (value) {
        return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
    strings._replaceAll = function (find, replace, str) {
        return str.replace(new RegExp(strings._escapeRegExp(find), 'g'), replace);
    };
    return strings;
}());
/* harmony default export */ __webpack_exports__["a"] = (strings);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lang__ = __webpack_require__(0);

var objects = /** @class */ (function () {
    function objects() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    /**
     * Recursively goes through an object trying to resolve a path.
     * <code>
     *      console.log("name.value", ly.lang.get({"name":{"value":1}}, "name.value"));
     *      console.log("[name,value]", ly.lang.get({"name":{"value":1}}, ["name","value"]));
     *      console.log("length", ly.lang.get([1,2], ["length"]));
     * </code>
     * @param {Object} scope - The object to traverse (in each recursive call we dig into this object)
     * @param {string[]} path - An array of property names to traverse one-by-one
     * @param {number} [pathIndex=0] - The current index in the path array
     */
    objects.get = function (scope, path, pathIndex) {
        if (pathIndex === void 0) { pathIndex = 0; }
        if (typeof scope !== 'object' || scope === null || scope === undefined) {
            return '';
        }
        path = __WEBPACK_IMPORTED_MODULE_0__lang__["a" /* default */].isArray(path) ? path : path.split('.');
        var varName = path[pathIndex];
        var value = scope[varName];
        if (pathIndex === path.length - 1) {
            // It's a leaf, return whatever it is
            return value;
        }
        return objects.get(value, path, ++pathIndex);
    };
    objects.clone = function (obj) {
        var target = {};
        for (var field in obj) {
            if (obj.hasOwnProperty(field)) {
                target[field] = obj[field];
            }
        }
        return target;
    };
    objects.isEmpty = function (value) {
        if (!!value) {
            if (value.hasOwnProperty("length")) {
                return value.length === 0;
            }
            else {
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        return false; // not empty
                    }
                }
            }
        }
        return true;
    };
    objects.keys = function (value) {
        var result = [];
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        return result;
    };
    objects.values = function (value) {
        var result = [];
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                result.push(value[key]);
            }
        }
        return result;
    };
    return objects;
}());
/* harmony default export */ __webpack_exports__["a"] = (objects);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_collections_Dictionary__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commons_events_EventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * Localization singleton controller.
 * Add dictionary using i18n.register(lang, dictionary);
 *
 * WARN:
 *  Do not listen directly at EVENT_CHANGE_LANG, but use Application events propagation.
 *  Components automatically handle this event, so you do not need to do it by yourself.
 *
 */
var i18n = /** @class */ (function (_super) {
    __extends(i18n, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function i18n() {
        var _this = _super.call(this) || this;
        _this._dictionaries = new __WEBPACK_IMPORTED_MODULE_0__commons_collections_Dictionary__["a" /* Dictionary */]();
        // get lang from browser
        _this._browser_lang = __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].lang();
        _this.register("", { key: "" });
        return _this;
    }
    Object.defineProperty(i18n.prototype, "EVENT_CHANGE_LANG", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return i18n._EVENT_CHANGE_LANG;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(i18n.prototype, "EVENT_LOCALIZED", {
        get: function () {
            return i18n._EVENT_LOCALIZED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(i18n.prototype, "lang", {
        get: function () {
            return this._lang || this._browser_lang;
        },
        set: function (lang) {
            this._changeLang(lang);
        },
        enumerable: true,
        configurable: true
    });
    i18n.prototype.register = function (lang, dictionary) {
        var dic = (dictionary instanceof __WEBPACK_IMPORTED_MODULE_0__commons_collections_Dictionary__["a" /* Dictionary */]) ? dictionary : new __WEBPACK_IMPORTED_MODULE_0__commons_collections_Dictionary__["a" /* Dictionary */](dictionary);
        this._dictionaries.put(lang, dic);
    };
    i18n.prototype.registerDefault = function (dictionary) {
        var dic = (dictionary instanceof __WEBPACK_IMPORTED_MODULE_0__commons_collections_Dictionary__["a" /* Dictionary */]) ? dictionary : new __WEBPACK_IMPORTED_MODULE_0__commons_collections_Dictionary__["a" /* Dictionary */](dictionary);
        this._dictionaries.put(i18n._DEF_LANG, dic);
    };
    i18n.prototype.get = function (label, def_val) {
        if (this._dictionaries.containsKey(this._lang)) {
            var dic = this._dictionaries.get(this._lang);
            return dic.get(label) || def_val || '';
        }
        else if (this._dictionaries.containsKey(i18n._DEF_LANG)) {
            var dic = this._dictionaries.get(i18n._DEF_LANG);
            return dic.get(label) || def_val || '';
        }
        return def_val || '';
    };
    i18n.prototype.localize = function (elem) {
        var _this = this;
        this._localize(elem);
        __WEBPACK_IMPORTED_MODULE_3__dom__["a" /* default */].forEachChild(elem, function (child) {
            _this._localize(child);
        }, true);
        var trigger_event = !!this._lang && this._dictionaries.count() > 0;
        if (trigger_event) {
            _super.prototype.emit.call(this, i18n._EVENT_LOCALIZED, this._lang, this._dictionaries.get(this._lang));
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    i18n.prototype._changeLang = function (value) {
        var new_lang = !!value ? value.split('-')[0] : '';
        if (!!new_lang) {
            var lang_changed = (this._dictionaries.count() > 0) && (new_lang !== this._lang);
            if (lang_changed) {
                this._lang = new_lang;
                _super.prototype.emit.call(this, i18n._EVENT_CHANGE_LANG, this._lang, this._dictionaries.get(this._lang));
            }
        }
    };
    i18n.prototype._localize = function (elem) {
        if (!!elem && !!elem.hasAttribute) {
            var data_i18n = elem.getAttribute(i18n._ATTR_DATA_I18N) || '';
            if (!!data_i18n) {
                var value = this.get(data_i18n);
                if (!!value) {
                    // console.log("i18n._localize", data_i18n, value);
                    // ready to set i18n text or placeholder
                    if (__WEBPACK_IMPORTED_MODULE_3__dom__["a" /* default */].isInput(elem)) {
                        if (__WEBPACK_IMPORTED_MODULE_3__dom__["a" /* default */].isInputButton(elem)) {
                            __WEBPACK_IMPORTED_MODULE_3__dom__["a" /* default */].setValue(elem, value);
                        }
                        else if (elem.hasAttribute("placeholder")) {
                            elem.setAttribute("placeholder", value);
                        }
                    }
                    else {
                        elem.innerHTML = value;
                    }
                }
            }
        }
    };
    i18n.instance = function () {
        if (null == i18n.__instance) {
            i18n.__instance = new i18n();
        }
        return i18n.__instance;
    };
    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------
    i18n._EVENT_CHANGE_LANG = "on_change_lang";
    i18n._EVENT_LOCALIZED = "on_localized";
    i18n._DEF_LANG = "base";
    i18n._ATTR_DATA_I18N = "data-i18n";
    return i18n;
}(__WEBPACK_IMPORTED_MODULE_1__commons_events_EventEmitter__["a" /* default */]));
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (i18n.instance());


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random__ = __webpack_require__(3);

var BaseObject = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function BaseObject() {
        this._uid = __WEBPACK_IMPORTED_MODULE_0__random__["a" /* default */].uniqueId(BaseObject.PREFIX);
    }
    Object.defineProperty(BaseObject.prototype, "uid", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._uid;
        },
        enumerable: true,
        configurable: true
    });
    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------
    BaseObject.PREFIX = "lyts_object_";
    return BaseObject;
}());
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (BaseObject);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_events_Events__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commons_lang__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commons_collections_Dictionary__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commons_events_EventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__i18n__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__ = __webpack_require__(20);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Component() {
        var _this = _super.call(this) || this;
        _this._native_events = new __WEBPACK_IMPORTED_MODULE_3__commons_collections_Dictionary__["a" /* Dictionary */]();
        _this._native_elements = new __WEBPACK_IMPORTED_MODULE_3__commons_collections_Dictionary__["a" /* Dictionary */]();
        _this._element = _this._createElement(_this.render());
        _this._element_wrapper = new __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__["a" /* default */](_this, _this._element);
        _this._data = {};
        _this._normalizeElements();
        _this.localize();
        // auto-localize
        __WEBPACK_IMPORTED_MODULE_5__i18n__["a" /* default */].on(_this, __WEBPACK_IMPORTED_MODULE_5__i18n__["a" /* default */].EVENT_CHANGE_LANG, _this.localize);
        return _this;
    }
    Component.prototype.remove = function () {
        this._free();
    };
    Object.defineProperty(Component.prototype, "data", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "element", {
        get: function () {
            return this._element_wrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "outerHTML", {
        get: function () {
            return !!this._element ? this._element.outerHTML : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "innerHTML", {
        get: function () {
            return !!this._element ? this._element.innerHTML : "";
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.hashCode = function (selector) {
        if (!!selector) {
            return this._hash(this._getFirstElement(selector));
        }
        return this._hash(this._element);
    };
    Component.prototype.hide = function () {
        __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].classAdd(this._element, 'hidden');
    };
    Component.prototype.show = function () {
        __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].classRemove(this._element, 'hidden');
    };
    // ------------------------------------------------------------------------
    //                      d o m
    // ------------------------------------------------------------------------
    Component.prototype.localize = function () {
        __WEBPACK_IMPORTED_MODULE_5__i18n__["a" /* default */].localize(this._element);
    };
    Component.prototype.get = function (selector) {
        var result = [];
        var elements = __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].get(selector, this._element);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            result.push(new __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__["a" /* default */](this, elem));
        }
        return result;
    };
    Component.prototype.getFirst = function (selector) {
        return new __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__["a" /* default */](this, __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].getFirst(selector, this._element));
    };
    Component.prototype.getLast = function (selector) {
        return new __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__["a" /* default */](this, __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].getLast(selector, this._element));
    };
    Component.prototype.appendTo = function (selector, clean_parent) {
        if (clean_parent === void 0) { clean_parent = false; }
        var elem = (selector instanceof __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__["a" /* default */])
            ? selector
            : new __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__["a" /* default */](this, __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].getFirst(selector));
        if (!!elem) {
            if (clean_parent) {
                elem.innerHTML = '';
            }
            elem.appendChild(this._element);
            //-- this is ready --//
            this.ready();
        }
    };
    Component.prototype.appendChild = function (child_html, opt_target_selector) {
        if (!!child_html) {
            var child = this._createElement(child_html);
            var target = this._resolveElement(opt_target_selector || null, this._element);
            if (!!target) {
                target.appendChild(child);
                // handle events for child
                this._normalizeElement(child);
            }
        }
    };
    /**
     * Return a class list.
     * @param {string} selector Element selector. Only first matched element is returned.
     * @return {string[]} Array of class names
     */
    Component.prototype.classList = function (selector) {
        var elem = this._getFirstElement(selector);
        if (!!elem) {
            return elem.className.split(" ");
        }
        return [];
    };
    /**
     * Check if selected element contains passed class. If passed class is an Array, check for all of them.
     * @param {string} selector Element selector. Only first matched element is returned.
     * @param {string | string[]} class_name Single class name or multiple class names.
     * @return {boolean} Match found or not.
     */
    Component.prototype.classHas = function (selector, class_name) {
        var elem = this._getFirstElement(selector);
        if (!!elem) {
            var classes = __WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].toArray(class_name);
            for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
                var aclass = classes_1[_i];
                if (!elem.classList.contains(aclass)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * Check the array for at least one match.
     * @param {string} selector  Element selector. Only first matched element is returned.
     * @param {string[]} class_name Array of classes
     * @return {boolean} Match found or not.
     */
    Component.prototype.classHasOne = function (selector, class_name) {
        var elem = this._getFirstElement(selector);
        if (!!elem) {
            var classes = __WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].toArray(class_name);
            for (var _i = 0, classes_2 = classes; _i < classes_2.length; _i++) {
                var aclass = classes_2[_i];
                if (elem.classList.contains(aclass)) {
                    return true;
                }
            }
        }
        return false;
    };
    Component.prototype.classAdd = function (selector, class_name) {
        var elem = this._getFirstElement(selector);
        return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].classAdd(elem, class_name);
    };
    Component.prototype.classRemove = function (selector, class_name) {
        var elem = this._getFirstElement(selector);
        return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].classRemove(elem, class_name);
    };
    Component.prototype.classSet = function (selector, value) {
        return this.attrSet(selector, "class", name);
    };
    Component.prototype.attrValue = function (selector, attr_name) {
        var elem = this._getFirstElement(selector);
        if (!!elem) {
            return elem.getAttribute(attr_name) || '';
        }
        return '';
    };
    Component.prototype.attrHas = function (selector, attr_name) {
        var elem = this._getFirstElement(selector);
        if (!!elem) {
            return elem.hasAttribute(attr_name);
        }
        return false;
    };
    Component.prototype.attrSet = function (selector, name, value) {
        var elem = this._getFirstElement(selector);
        if (!!elem) {
            elem.setAttribute(name, value);
            return elem.getAttribute(name) || '';
        }
        return '';
    };
    Component.prototype.getValue = function (selector) {
        var elem = this._getFirstElement(selector);
        if (!!elem) {
            return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].getValue(elem);
        }
        return null;
    };
    // ------------------------------------------------------------------------
    //                      p r o t e c t e d
    // ------------------------------------------------------------------------
    /**
     * Add event listener to internal HTMLElement
     * @param {string} selector
     * @param {string} event_name
     * @param {Listener} listener
     */
    Component.prototype.addEventListener = function (selector, event_name, listener) {
        var elem = this._resolveElement(selector, this._element);
        if (!!elem) {
            this._addEventListener(elem, event_name, listener);
        }
        else {
            console.warn("Component.addEventListener()", "Unable to add event '" + event_name + "' to '" + selector + "': Element not found!");
        }
    };
    /**
     * Remove event listener from internal HTMLElement
     * @param {string} selector
     * @param {string | string[]} event_names
     */
    Component.prototype.removeEventListener = function (selector, event_names) {
        var elem = this._resolveElement(selector, this._element);
        if (!!elem) {
            this._removeEventListener(elem, __WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].toArray(event_names));
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Component.prototype._free = function () {
        // remove ly events
        _super.prototype.off.call(this, this);
        // remove native events
        this._freeListeners();
        // remove element from dom
        if (!!this._element) {
            this._element.remove();
        }
        // clear list
        this._native_events.clear();
        this._native_elements.clear();
        __WEBPACK_IMPORTED_MODULE_5__i18n__["a" /* default */].off(this, __WEBPACK_IMPORTED_MODULE_5__i18n__["a" /* default */].EVENT_CHANGE_LANG);
        // call abstract free
        this.free();
    };
    Component.prototype._freeListeners = function () {
        var hash_codes = this._native_events.keys();
        for (var _i = 0, hash_codes_1 = hash_codes; _i < hash_codes_1.length; _i++) {
            var hash_code = hash_codes_1[_i];
            var elem = this._native_elements.get(hash_code);
            if (!!elem) {
                var names = this._native_events.get(hash_code).eventNames();
                var count = this._removeEventListener(elem, names);
                //console.log("Component._free()", hash_code, names, count);
            }
        }
    };
    Component.prototype._normalizeElements = function () {
        var _this = this;
        // events on root
        this._normalizeElement(this._element);
        // events on child
        __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].forEachChild(this._element, function (elem) {
            _this._normalizeElement(elem);
        }, true);
    };
    Component.prototype._resolveElement = function (elem_or_selector, defVal) {
        if (!!elem_or_selector) {
            if (__WEBPACK_IMPORTED_MODULE_2__commons_lang__["a" /* default */].isString(elem_or_selector)) {
                var found = this._getFirstElement(elem_or_selector);
                if (!!found) {
                    return this._normalizeElement(found);
                }
            }
            else {
                var found = elem_or_selector;
                if (!!found) {
                    return this._normalizeElement(found);
                }
            }
        }
        return !!defVal ? this._normalizeElement(defVal) : null;
    };
    Component.prototype._getElement = function (selector) {
        return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].get(selector, this._element);
    };
    Component.prototype._getFirstElement = function (selector) {
        return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].getFirst(selector, this._element);
    };
    Component.prototype._getLastElement = function (selector) {
        return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].getLast(selector, this._element);
    };
    Component.prototype._addEventListener = function (elem, event_name, listener) {
        var hash_code = this._hash(elem);
        if (!this._native_events.containsKey(hash_code)) {
            this._native_events.put(hash_code, new __WEBPACK_IMPORTED_MODULE_0__commons_events_Events__["a" /* default */]());
        }
        // get context binded listener
        var ctx_listener = listener.bind(this);
        // register reference for further removal
        this._native_events.get(hash_code).on(event_name, ctx_listener);
        // attach listener to native event
        elem.addEventListener(event_name, ctx_listener, false);
    };
    Component.prototype._removeEventListener = function (elem, event_names, listener) {
        var counter = 0;
        if (!!elem) {
            var hash_code = this._hash(elem);
            if (this._native_events.containsKey(hash_code)) {
                var events = this._native_events.get(hash_code);
                for (var _i = 0, event_names_1 = event_names; _i < event_names_1.length; _i++) {
                    var name_1 = event_names_1[_i];
                    if (!!listener) {
                        // remove reference
                        events.removeListener(name_1, listener);
                        // remove native
                        elem.removeEventListener(name_1, listener);
                        counter++;
                    }
                    else {
                        var all_listeners = events.listeners(name_1);
                        for (var i = 0; i < all_listeners.length; i++) {
                            var _listener = all_listeners[i];
                            // remove reference
                            events.removeListener(name_1, _listener);
                            // remove native
                            elem.removeEventListener(name_1, _listener);
                            counter++;
                        }
                    }
                }
            }
        }
        return counter;
    };
    Component.prototype._createElement = function (html) {
        html = html.trim();
        return this._normalizeElement(__WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].newElement(html));
    };
    Component.prototype._normalizeElement = function (elem) {
        // add hash
        this._hash(elem);
        //... do more stuff here
        return elem;
    };
    Component.prototype._hash = function (elem) {
        if (null != elem) {
            var hash_code = __WEBPACK_IMPORTED_MODULE_6__ElementWrapper__["a" /* default */].hash(elem);
            if (!!hash_code) {
                // add new element reference to internal hash dictionary
                this._native_elements.put(hash_code, elem);
            }
            return hash_code;
        }
        return '';
    };
    return Component;
}(__WEBPACK_IMPORTED_MODULE_4__commons_events_EventEmitter__["a" /* default */]));
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (Component);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var IS_LOCALE = true;
var HOST_LOCALE = 'https://localhost:4000';
var HOST = 'https://api.conversacon.com:4000';
var constants = {
    uid: "lyts_sample_app",
    version: "1.0",
    //-- host --//
    //-- host --//
    host: IS_LOCALE ? HOST_LOCALE : HOST,
    // APP IDENTIFIER
    APP_TOKEN: "botbuilder_dashboard_uyfgvdjqs6723",
    //-- STANDARD COMPONENTS EVENTS (do not use for native HTMLElement) --//
    EVENT_ON_CLICK: "on_click",
};
/* harmony default export */ __webpack_exports__["a"] = (constants);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commons_console__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Page(route) {
        var _this = _super.call(this) || this;
        try {
            _this._name = _this.uid;
            if (!!route) {
                _this._params = route.params;
                _this._name = route.uid();
            }
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_1__commons_console__["a" /* default */].error("Page.construcotr", err);
        }
        return _this;
    }
    Object.defineProperty(Page.prototype, "name", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "params", {
        /**
         * Return url parameters if any
         */
        get: function () {
            return !!this._params ? this._params : false;
        },
        enumerable: true,
        configurable: true
    });
    return Page;
}(__WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */]));
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (Page);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_BaseObject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Main__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_ApplicationController__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lyts_core_commons_console__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var CONTAINER = "#_app_container";
var launcher = /** @class */ (function (_super) {
    __extends(launcher, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function launcher() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    launcher.prototype.start = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4__controllers_ApplicationController__["a" /* default */].ready(function (app_context) {
            _this.loadMain();
        });
    };
    /**
     * This method is expected from ConversaCon controller to remove running app
     */
    launcher.prototype.remove = function () {
        try {
            if (!!this._main) {
                this._main.remove();
                __WEBPACK_IMPORTED_MODULE_5__lyts_core_commons_console__["a" /* default */].log("launcher.remove()", __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* default */].version);
            }
            if (!!this._global_i18n) {
                this._global_i18n.off(this); // remove all listeners
            }
            // remove local listeners, too
            __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__["a" /* default */].Application.events.off(this);
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_5__lyts_core_commons_console__["a" /* default */].error("launcher.remove()", err);
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    launcher.prototype.init = function () {
        // init application scope
        __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_BaseObject__["a" /* default */].PREFIX = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* default */].uid + "_"; // application uid become component prefix.
        // local i18n
        __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__["a" /* default */].Application.events.on(this, __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__["a" /* default */].i18n.EVENT_CHANGE_LANG, this.onLocalChangeLang);
    };
    launcher.prototype.loadMain = function () {
        this._main = new __WEBPACK_IMPORTED_MODULE_3__views_Main__["a" /* default */]();
        this._main.appendTo(CONTAINER);
    };
    launcher.prototype.onLocalChangeLang = function (lang) {
        // propagate to global
        if (!!this._global_i18n) {
            this._global_i18n.lang = lang;
        }
    };
    launcher.instance = function () {
        if (null == launcher.__instance) {
            launcher.__instance = new launcher();
        }
        return launcher.__instance;
    };
    return launcher;
}(__WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_BaseObject__["a" /* default */]));
// ------------------------------------------------------------------------
//                      S T A R T   A P P L I C A T I O N
// ------------------------------------------------------------------------
launcher.instance().start();


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lang__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strings__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects__ = __webpack_require__(10);



/**
 * Utility class
 */
var format = /** @class */ (function () {
    function format() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    format.template = function (template, model) {
        if (model === void 0) { model = {}; }
        var VAR_MATCH_REGEX = /\{\{\s*(.*?)\s*\}\}/g;
        // don't touch the template if it is not a string
        if (typeof template !== 'string') {
            return template;
        }
        return template.replace(VAR_MATCH_REGEX, function (match, varName) {
            try {
                // defaultResolver never throws
                return __WEBPACK_IMPORTED_MODULE_0__lang__["a" /* default */].toString(__WEBPACK_IMPORTED_MODULE_2__objects__["a" /* default */].get(model, varName));
            }
            catch (e) {
                // if your resolver throws, we proceed with the default resolver
                return '';
            }
        });
    };
    format.date = function (date, locales, options) {
        try {
            if (!!locales) {
                if (__WEBPACK_IMPORTED_MODULE_0__lang__["a" /* default */].isArray(locales) || locales.length < 6) {
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
                    return date.toLocaleString(locales, options);
                }
                else if (__WEBPACK_IMPORTED_MODULE_0__lang__["a" /* default */].isString(locales)) {
                    // uses pattern
                    var nm = format.getMonthName(date);
                    var nd = format.getDayName(date);
                    var f = locales;
                    f = f.replace(/yyyy/g, date.getFullYear() + "");
                    f = f.replace(/yy/g, String(date.getFullYear()).substr(2, 2));
                    f = f.replace(/MMM/g, nm.substr(0, 3).toUpperCase());
                    f = f.replace(/Mmm/g, nm.substr(0, 3));
                    f = f.replace(/MM\*/g, nm.toUpperCase());
                    f = f.replace(/Mm\*/g, nm);
                    f = f.replace(/mm/g, __WEBPACK_IMPORTED_MODULE_1__strings__["a" /* default */].fillLeft(String(date.getMonth() + 1), '0', 2));
                    f = f.replace(/DDD/g, nd.substr(0, 3).toUpperCase());
                    f = f.replace(/Ddd/g, nd.substr(0, 3));
                    f = f.replace(/DD\*/g, nd.toUpperCase());
                    f = f.replace(/Dd\*/g, nd);
                    f = f.replace(/dd/g, __WEBPACK_IMPORTED_MODULE_1__strings__["a" /* default */].fillLeft(String(date.getDate()), '0', 2));
                    f = f.replace(/d\*/g, date.getDate() + "");
                    return f;
                }
            }
            return date.toLocaleString([], options);
        }
        catch (err) {
        }
        return '';
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    format.getMonthName = function (date) {
        return date.toLocaleString().replace(/[^a-z]/gi, '');
    };
    format.getDayName = function (date) {
        switch (date.getDay()) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
        return '';
    };
    return format;
}());
/* harmony default export */ __webpack_exports__["a"] = (format);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser__ = __webpack_require__(4);

/**
 * Cookies Helper class
 */
var cookies = /** @class */ (function () {
    function cookies() {
    }
    cookies.create = function (name, value, days) {
        if (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isReady()) {
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            else
                expires = '';
            document.cookie = name + '=' + value + expires + '; path=/';
        }
    };
    cookies.read = function (name, default_value) {
        if (default_value === void 0) { default_value = ''; }
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return default_value;
    };
    /**
     * Remove a cookie
     * @param name Cookie name
     */
    cookies.erase = function (name) {
        if (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isReady()) {
            cookies.create(name, '', -1);
        }
    };
    /**
     * Remove all cookies
     */
    cookies.clear = function () {
        if (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* default */].isReady()) {
            var cookies_1 = document.cookie.split(";");
            for (var i = 0; i < cookies_1.length; i++) {
                var cookie = cookies_1[i];
                var eqPos = cookie.indexOf("=");
                var name_1 = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name_1 + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
    };
    return cookies;
}());
/* harmony default export */ __webpack_exports__["a"] = (cookies);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DEFAULT_REQUEST_OPTIONS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClient; });
var DEFAULT_REQUEST_OPTIONS = {
    ignoreCache: false,
    headers: {
        Accept: 'application/json, text/javascript, text/plain, */*; q=0.01',
    },
    // default max duration for a request
    timeout: 5000,
};
var HttpClient = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      C O N S T
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function HttpClient() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    HttpClient.prototype.send = function (method, url, queryParams, body, options) {
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        if (body === void 0) { body = null; }
        if (options === void 0) { options = DEFAULT_REQUEST_OPTIONS; }
        var ignoreCache = options.ignoreCache || DEFAULT_REQUEST_OPTIONS.ignoreCache;
        var headers = options.headers || DEFAULT_REQUEST_OPTIONS.headers;
        var timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, _this.withQuery(url, queryParams)); // open sync
            if (headers) {
                Object.keys(headers).forEach(function (key) { return xhr.setRequestHeader(key, headers[key]); });
            }
            if (ignoreCache) {
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }
            xhr.timeout = timeout || 5000;
            xhr.onload = function (evt) {
                resolve(_this.parseXHRResult(xhr));
            };
            xhr.onerror = function (evt) {
                reject(_this.errorResponse(xhr, 'Failed to make request.'));
            };
            xhr.ontimeout = function (evt) {
                reject(_this.errorResponse(xhr, 'Request took longer than expected.'));
            };
            if (method === 'post' && body) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(body));
            }
            else {
                xhr.send();
            }
        });
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    HttpClient.prototype.queryParams = function (params) {
        if (params === void 0) { params = {}; }
        return Object.keys(params)
            .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); })
            .join('&');
    };
    HttpClient.prototype.withQuery = function (url, params) {
        if (params === void 0) { params = {}; }
        var queryString = this.queryParams(params);
        return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
    };
    HttpClient.prototype.parseXHRResult = function (xhr) {
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: function () {
                try {
                    return JSON.parse(xhr.responseText);
                }
                catch (err) {
                    return {};
                }
            },
        };
    };
    HttpClient.prototype.errorResponse = function (xhr, message) {
        if (message === void 0) { message = null; }
        return {
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: message || xhr.statusText,
            json: function () {
                try {
                    return JSON.parse(message || xhr.statusText);
                }
                catch (err) {
                    return {};
                }
            },
        };
    };
    return HttpClient;
}());



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_random__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__(6);


/**
 * Wrap a native HTMLElement to expose at Component methods.
 */
var ElementWrapper = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function ElementWrapper(owner, elem) {
        this._owner = owner;
        this._element = elem;
        this._hash_all();
    }
    Object.defineProperty(ElementWrapper.prototype, "htmlElement", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        /**
         * Warning: do not attach events to this object.
         * Use instead "addEventListener" method.
         * @return {HTMLElement}
         */
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    ElementWrapper.prototype.hasElement = function () {
        return !!this._element;
    };
    ElementWrapper.prototype.remove = function () {
        if (!!this._element) {
            this._element.remove();
        }
    };
    ElementWrapper.prototype.appendChild = function (child) {
        if (!!this._element) {
            if (child instanceof ElementWrapper) {
                var elem = child;
                if (!!elem._element) {
                    this._element.appendChild(elem._element);
                }
            }
            else {
                this._element.appendChild(child);
            }
        }
    };
    ElementWrapper.prototype.appendTo = function (parent) {
        if (!!this._element && !!parent) {
            if (parent instanceof ElementWrapper) {
                parent.appendChild(this._element);
            }
            else {
                parent.appendChild(this._element);
            }
        }
    };
    Object.defineProperty(ElementWrapper.prototype, "innerHTML", {
        get: function () {
            if (!!this._element) {
                return this._element.innerHTML;
            }
            return '';
        },
        set: function (value) {
            if (!!this._element) {
                this._element.innerHTML = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "children", {
        get: function () {
            var _this = this;
            var response = [];
            if (!!this._element) {
                __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].forEachChild(this._element, function (elem) {
                    response.push(new ElementWrapper(_this._owner, elem));
                });
            }
            return response;
        },
        enumerable: true,
        configurable: true
    });
    ElementWrapper.prototype.addEventListener = function (event_name, listener) {
        if (null != this._element && !!this._owner) {
            var hash_code = ElementWrapper.hash(this._element);
            if (!!hash_code) {
                var selector = "[" + ElementWrapper.HASH_ATTRIBUTE + "=" + hash_code + "]";
                this._owner.addEventListener(selector, event_name, listener);
            }
        }
        else {
            if (!this._element) {
                console.error("ElementWrapper.addEventListener()", "Missing HTML Element.", this);
            }
            else {
                console.error("ElementWrapper.addEventListener()", "Component Owner.", this._element);
            }
        }
    };
    ElementWrapper.prototype.removeEventListener = function (event_names) {
        if (null != this._element && !!this._owner) {
            var hash_code = ElementWrapper.hash(this._element);
            if (!!hash_code) {
                var selector = "[" + ElementWrapper.HASH_ATTRIBUTE + "=" + hash_code + "]";
                this._owner.removeEventListener(selector, event_names);
            }
        }
        else {
            console.error("ElementWrapper.removeEventListener()", "Missing HTML Element or Component Owner.");
        }
    };
    ElementWrapper.prototype.classAdd = function (class_name) {
        return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].classAdd(this._element, class_name);
    };
    ElementWrapper.prototype.classRemove = function (class_name) {
        return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].classRemove(this._element, class_name);
    };
    ElementWrapper.prototype.hasAttribute = function (name) {
        if (!!this._element) {
            return this._element.hasAttribute(name);
        }
        return false;
    };
    ElementWrapper.prototype.setAttribute = function (name, value) {
        if (!!this._element) {
            this._element.setAttribute(name, value);
        }
    };
    ElementWrapper.prototype.getAttribute = function (name) {
        if (!!this._element) {
            return this._element.getAttribute(name) || "";
        }
        return "";
    };
    ElementWrapper.prototype.value = function (value) {
        try {
            if (!!this._element) {
                if (value != undefined) {
                    __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].setValue(this._element, value);
                }
                return __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].getValue(this._element);
            }
        }
        catch (err) {
            console.error("ElementWrapper.value()", err);
        }
        return '';
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    ElementWrapper.prototype._hash_all = function () {
        if (null != this._element) {
            // events on root
            ElementWrapper.hash(this._element);
            // events on child
            __WEBPACK_IMPORTED_MODULE_1__dom__["a" /* default */].forEachChild(this._element, function (elem) {
                ElementWrapper.hash(elem);
            }, true);
        }
    };
    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------
    ElementWrapper.hash = function (elem) {
        if (!!elem && !!elem.hasAttribute) {
            if (!elem.hasAttribute(ElementWrapper.HASH_ATTRIBUTE)) {
                var hash_code = __WEBPACK_IMPORTED_MODULE_0__commons_random__["a" /* default */].id();
                elem.setAttribute(ElementWrapper.HASH_ATTRIBUTE, hash_code);
            }
            return elem.getAttribute(ElementWrapper.HASH_ATTRIBUTE) || '';
        }
        return '';
    };
    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------
    ElementWrapper.HASH_ATTRIBUTE = "__hash__";
    return ElementWrapper;
}());
/* harmony default export */ __webpack_exports__["a"] = (ElementWrapper);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_events_Events__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commons_collections_Dictionary__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commons_BaseObject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_i18n__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commons_events_EventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__commons_lang__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var ApplicationEvents = /** @class */ (function () {
    function ApplicationEvents() {
        this._listeners = new __WEBPACK_IMPORTED_MODULE_1__commons_collections_Dictionary__["a" /* Dictionary */]();
    }
    ApplicationEvents.prototype.on = function (scope, eventName, listener) {
        var key = ApplicationEvents.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new __WEBPACK_IMPORTED_MODULE_0__commons_events_Events__["a" /* default */]());
        }
        this._listeners.get(key).on(eventName, listener.bind(scope));
    };
    ApplicationEvents.prototype.once = function (scope, eventName, listener) {
        var key = ApplicationEvents.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new __WEBPACK_IMPORTED_MODULE_0__commons_events_Events__["a" /* default */]());
        }
        this._listeners.get(key).once(eventName, listener.bind(scope));
    };
    ApplicationEvents.prototype.off = function (scope, eventName) {
        var key = ApplicationEvents.key(scope);
        if (this._listeners.containsKey(key)) {
            this._listeners.get(key).off(eventName);
        }
    };
    ApplicationEvents.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var keys = this._listeners.keys();
        for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
            var key = keys_1[_a];
            if (this._listeners.containsKey(key)) {
                (_b = this._listeners.get(key)).emit.apply(_b, [eventName].concat(args));
            }
        }
        var _b;
    };
    ApplicationEvents.prototype.clear = function () {
        var keys = this._listeners.keys();
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (this._listeners.containsKey(key)) {
                this._listeners.get(key).clear();
            }
        }
    };
    ApplicationEvents.key = function (scope) {
        try {
            return scope.uid;
        }
        catch (err) {
            console.warn("ApplicationEvents.key()", "BINDING EVENT ON DEFAULT KEY!");
            return '_default';
        }
    };
    return ApplicationEvents;
}());
/**
 * Main Application Controller.
 * This is a singleton
 *
 * Events:
 * i18n.EVENT_CHANGE_LANG: Application propagates i18n EVENT_CHANGE_LANG for a centralized and
 * managed access to this event.
 *
 */
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Application() {
        var _this = _super.call(this) || this;
        _this._events = new __WEBPACK_IMPORTED_MODULE_4__commons_events_EventEmitter__["a" /* default */]();
        _this._scope = new __WEBPACK_IMPORTED_MODULE_1__commons_collections_Dictionary__["a" /* Dictionary */]();
        _this.init();
        return _this;
    }
    Object.defineProperty(Application.prototype, "EVENT_CHANGE_LANG", {
        // ------------------------------------------------------------------------
        //                      p r o p e r t i e s
        // ------------------------------------------------------------------------
        get: function () {
            return Application._EVENT_CHANGE_LANG;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "EVENT_LOCALIZED", {
        get: function () {
            return Application._EVENT_LOCALIZED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        enumerable: true,
        configurable: true
    });
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    Application.prototype.clear = function () {
        if (!!this._scope) {
            this._scope.clear();
        }
        if (!!this._events) {
            this._events.clear();
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Application.prototype.init = function () {
        // i18n event (debounced to avoid multiple events)
        __WEBPACK_IMPORTED_MODULE_3__view_i18n__["a" /* default */].on(this, this.EVENT_CHANGE_LANG, __WEBPACK_IMPORTED_MODULE_5__commons_lang__["a" /* default */].funcDebounce(this, this.oni18nLangChange, 400, true));
        __WEBPACK_IMPORTED_MODULE_3__view_i18n__["a" /* default */].on(this, this.EVENT_LOCALIZED, __WEBPACK_IMPORTED_MODULE_5__commons_lang__["a" /* default */].funcDebounce(this, this.oni18nLocalized, 400, true));
    };
    Application.prototype.oni18nLangChange = function (lang, dictionary) {
        this.events.emit(this.EVENT_CHANGE_LANG, lang, dictionary);
    };
    Application.prototype.oni18nLocalized = function (lang, dictionary) {
        this.events.emit(this.EVENT_LOCALIZED, lang, dictionary);
    };
    Application.instance = function () {
        if (null == Application.__instance) {
            Application.__instance = new Application();
        }
        return Application.__instance;
    };
    // ------------------------------------------------------------------------
    //                      C O N S T
    // ------------------------------------------------------------------------
    Application._EVENT_CHANGE_LANG = __WEBPACK_IMPORTED_MODULE_3__view_i18n__["a" /* default */].EVENT_CHANGE_LANG;
    Application._EVENT_LOCALIZED = __WEBPACK_IMPORTED_MODULE_3__view_i18n__["a" /* default */].EVENT_LOCALIZED;
    return Application;
}(__WEBPACK_IMPORTED_MODULE_2__commons_BaseObject__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (Application.instance());


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainView__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lyts_core_ly__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_i18n_en__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_i18n_it__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lyts_core_view_routing_PageController__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_page1_Page1__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page2_Page2__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();









var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Main() {
        var _this = _super.call(this, "") || this;
        // customize console
        __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].uid = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* default */].uid;
        // register pages
        _super.prototype.register.call(_this, '/page1', __WEBPACK_IMPORTED_MODULE_7__pages_page1_Page1__["a" /* default */]);
        _super.prototype.register.call(_this, '/page2/:param1/:param2', __WEBPACK_IMPORTED_MODULE_8__pages_page2_Page2__["a" /* default */]);
        _super.prototype.register.call(_this, '/page3/:param1/not_a_param', __WEBPACK_IMPORTED_MODULE_8__pages_page2_Page2__["a" /* default */]);
        _super.prototype.register.call(_this, '/call', function (args) {
            __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].log("CALLBACK", "Hello from a callback", args);
        });
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------
    Main.prototype.render = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_0__MainView__["a" /* default */])(this.uid, {});
    };
    Main.prototype.free = function () {
        _super.prototype.free.call(this);
        // release memory
        __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].log("REMOVED: ", __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* default */].uid);
    };
    Main.prototype.ready = function () {
        _super.prototype.ready.call(this);
        this.init();
    };
    Main.prototype.show = function () {
    };
    Main.prototype.hide = function () {
    };
    Main.prototype.route = function (page) {
        page.appendTo(this.element);
    };
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Main.prototype.init = function () {
        try {
            // App localizations
            this.initI18n();
            // event handlers
            this.initHandlers();
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].error("Main.init()", err);
        }
    };
    Main.prototype.initI18n = function () {
        //-- load i18n dictionaries --//
        __WEBPACK_IMPORTED_MODULE_3__lyts_core_ly__["a" /* default */].i18n.registerDefault(__WEBPACK_IMPORTED_MODULE_4__model_i18n_en__["a" /* default */]);
        __WEBPACK_IMPORTED_MODULE_3__lyts_core_ly__["a" /* default */].i18n.register("en", __WEBPACK_IMPORTED_MODULE_4__model_i18n_en__["a" /* default */]);
        __WEBPACK_IMPORTED_MODULE_3__lyts_core_ly__["a" /* default */].i18n.register("it", __WEBPACK_IMPORTED_MODULE_5__model_i18n_it__["a" /* default */]);
    };
    Main.prototype.initHandlers = function () {
    };
    return Main;
}(__WEBPACK_IMPORTED_MODULE_6__lyts_core_view_routing_PageController__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (Main);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = view;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainStyle__ = __webpack_require__(24);

function view(uid, props) {
    props = props || {};
    return "\n            <div id=\"" + uid + "\" class=\"\">\n                " + Object(__WEBPACK_IMPORTED_MODULE_0__MainStyle__["a" /* default */])(uid, props) + "\n   \n                MAIN PAGE\n                        \n            </div>\n\n        ";
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = style;
function style(uid, props) {
    // main
    var main = "\n        <style>\n            \n        </style>      \n    ";
    return "\n        " + main + "\n           \n    ";
}
;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    app_name: "App Boilerplate",
    btn_ok: "OK",
    page_sample_name: "SECONDARY PAGE",
});


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    app_name: "App Boilerplate",
    btn_ok: "OK",
    page_sample_name: "PAGINA SECONDARIA",
});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Component__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commons_lang__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commons_console__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var PageController = /** @class */ (function (_super) {
    __extends(PageController, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function PageController(root, hash) {
        if (hash === void 0) { hash = ''; }
        var _this = _super.call(this) || this;
        _this._router = new __WEBPACK_IMPORTED_MODULE_1__Router__["b" /* Router */](root, hash);
        _this._router.on(_this, __WEBPACK_IMPORTED_MODULE_1__Router__["a" /* EVENT_ON_ROUTE */], _this.onRoute);
        return _this;
    }
    PageController.prototype.render = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */])(this.uid, {});
    };
    PageController.prototype.free = function () {
        this._router.stop();
        if (!!this._last_page) {
            this._last_page.remove();
        }
    };
    PageController.prototype.ready = function () {
        this._router.start();
    };
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    PageController.prototype.register = function (route, handler) {
        this._router.register(route, handler);
    };
    PageController.prototype.current = function () {
        return this._last_page;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    PageController.prototype._init = function () {
    };
    PageController.prototype.onRoute = function (route) {
        try {
            var params = route.params;
            var func = route.handler;
            if (__WEBPACK_IMPORTED_MODULE_3__commons_lang__["a" /* default */].isFunction(func)) {
                if (__WEBPACK_IMPORTED_MODULE_3__commons_lang__["a" /* default */].isConstructor(route.handler)) {
                    // close last page
                    var last_page_1 = this._last_page;
                    if (!!last_page_1) {
                        last_page_1.hide();
                        __WEBPACK_IMPORTED_MODULE_3__commons_lang__["a" /* default */].funcDelay(function () {
                            last_page_1.remove();
                        }, 400);
                    }
                    this._last_route = route;
                    this._last_page = new func(route);
                    this.route(this._last_page);
                }
                else {
                    // we have a callback
                    func(params);
                }
            }
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_4__commons_console__["a" /* default */].error("PageController.onRoute", err);
        }
    };
    return PageController;
}(__WEBPACK_IMPORTED_MODULE_0__components_Component__["a" /* default */]));
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (PageController);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Router; });
/* unused harmony export Route */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EVENT_ON_ROUTE; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_events_EventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commons_collections_Dictionary__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commons_console__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commons_lang__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__commons_objects__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__commons_random__ = __webpack_require__(3);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Route = /** @class */ (function () {
    function Route(route, handler) {
        this.path = route;
        this.handler = handler;
        this.tokens = this.tokenize(route);
        this.params = false;
    }
    Route.prototype.uid = function () {
        try {
            return __WEBPACK_IMPORTED_MODULE_4__commons_lang__["a" /* default */].className(this.handler) + "." + __WEBPACK_IMPORTED_MODULE_5__commons_objects__["a" /* default */].values(this.params).join('.');
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_3__commons_console__["a" /* default */].error("Route.uid", err);
        }
        return __WEBPACK_IMPORTED_MODULE_6__commons_random__["a" /* default */].guid();
    };
    Route.prototype.isEmpty = function () {
        return !this.handler;
    };
    Route.prototype.match = function (url) {
        try {
            var url_tokens = this.tokenize(url);
            if (url_tokens.length === this.tokens.length) {
                var params = this.mapTokens(url_tokens);
                if (!!params) {
                    this.params = params;
                    return true;
                }
            }
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_3__commons_console__["a" /* default */].error("Route.match", err);
        }
        return false;
    };
    Route.prototype.tokenize = function (s) {
        var response = [];
        if (!!s) {
            var tokens = s.split('/');
            for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                var token = tokens_1[_i];
                if (!!token) {
                    response.push(token);
                }
            }
        }
        return response;
    };
    Route.prototype.mapTokens = function (url_tokens) {
        var params = {};
        var count = 0;
        for (var i = 0; i < this.tokens.length; i++) {
            var route_token = this.tokens[i];
            var url_token = url_tokens[i];
            var route_token_is_param = route_token.indexOf(':') === 0; // starts with :
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
    };
    return Route;
}());
// ------------------------------------------------------------------------
//                      c o n s t
// ------------------------------------------------------------------------
var _EVENT_POP_STATE = 'popstate';
var _EVENT_HASH_CHANGE = 'hashchange';
var _EMPTY = 'empty';
var _DEF_HASH = '#!';
var EVENT_ON_ROUTE = 'on_route'; // route found
/**
 * Handle a simple routing between pages.
 *
 */
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Router(root, hash) {
        if (root === void 0) { root = ''; }
        if (hash === void 0) { hash = _DEF_HASH; }
        var _this = _super.call(this) || this;
        _this._routes = new __WEBPACK_IMPORTED_MODULE_1__commons_collections_Dictionary__["a" /* Dictionary */]();
        _this._mode = __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].isPushStateAvailable() ? _EVENT_POP_STATE : __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].isHashChangeAvailable() ? _EVENT_HASH_CHANGE : _EMPTY;
        _this._native_listener = _this.onLocationChange.bind(_this);
        _this._hash = !!hash ? hash : _DEF_HASH;
        _this._use_hash = true;
        _this._root = root;
        _this.initialize();
        return _this;
    }
    Object.defineProperty(Router.prototype, "root", {
        // ------------------------------------------------------------------------
        //                      p r o p e r t i e s
        // ------------------------------------------------------------------------
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "useHash", {
        get: function () {
            return this._use_hash;
        },
        set: function (value) {
            this._use_hash = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "paused", {
        get: function () {
            return this._paused;
        },
        set: function (value) {
            this._paused = value;
        },
        enumerable: true,
        configurable: true
    });
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    /**
     * START ROUTER
     */
    Router.prototype.start = function () {
        this.initialize();
        this.startListen();
        this.resolve();
    };
    /**
     * STOP ROUTER
     */
    Router.prototype.stop = function () {
        this.clear();
        // remove listeners
        this.stopListen();
    };
    Router.prototype.clear = function () {
        this._routes.clear();
    };
    /**
     * Register a rout handler
     * @param {string} route Route url. "/page1", "/page2/:id/:name"
     * @param {Page, Function} handler Route handle
     * @return {Router} this
     */
    Router.prototype.register = function (path, handler) {
        path = path || '/';
        var route = new Route(path, handler);
        if (this._routes.count() === 0) {
            // first page is also home page
            this._home_route = route;
        }
        this._routes.put(path, route);
        return this;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Router.prototype.initialize = function () {
        if (!!this._root) {
            this._root = this._use_hash
                ? this.root.replace(/\/$/, '/' + this._hash)
                : this.root.replace(/\/$/, '');
        }
        else if (this._use_hash) {
            this._root = __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].location().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
        }
    };
    Router.prototype.startListen = function () {
        if (__WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].isReady()) {
            var event_name = this._mode;
            window.addEventListener(event_name, this._native_listener);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3__commons_console__["a" /* default */].warn("startListen", "Browser not Ready!");
        }
    };
    Router.prototype.stopListen = function () {
        if (__WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].isReady()) {
            var event_name = this._mode;
            window.removeEventListener(event_name, this._native_listener);
        }
    };
    Router.prototype.onLocationChange = function (current) {
        if (!this.paused) {
            this.resolve();
        }
    };
    Router.prototype.getRoute = function (url) {
        if (!this._routes.isEmpty() && !this.paused) {
            var paths = this._routes.keys();
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var path = paths_1[_i];
                var route = this._routes.get(path);
                if (route.match(url)) {
                    return route;
                }
            }
            return this._home_route; // fallback page is always home page
        }
        return new Route("", null); // empty route
    };
    // https://github.com/krasimir/navigo/blob/master/src/index.js
    Router.prototype.resolve = function (raw_path) {
        raw_path = !!raw_path ? Router.normalize(raw_path) : Router.normalize(__WEBPACK_IMPORTED_MODULE_2__browser__["a" /* default */].location());
        // remove root from url
        var url = raw_path.replace(this.root, '').replace(this.hash, '');
        var last_uid = !!this._last_route ? this._last_route.uid() : '';
        var route = this.getRoute(url);
        if (!route.isEmpty()) {
            var curr_uid = route.uid();
            //console.log("resolve", last_uid, curr_uid);
            if (last_uid === curr_uid) {
                // alredy routed
                return;
            }
            this._last_route = route;
            _super.prototype.emit.call(this, EVENT_ON_ROUTE, route);
        }
    };
    Router.normalize = function (s) {
        return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
    };
    Router.instance = function () {
        if (null == Router.__instance) {
            Router.__instance = new Router();
        }
        return Router.__instance;
    };
    return Router;
}(__WEBPACK_IMPORTED_MODULE_0__commons_events_EventEmitter__["a" /* default */]));



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = view;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style__ = __webpack_require__(30);

function view(uid, props) {
    return "\n            " + Object(__WEBPACK_IMPORTED_MODULE_0__style__["a" /* default */])(uid, props) + "\n            \n            <div id=\"" + uid + "\">\n                " + (!!props ? props.test : "") + "\n            </div>\n        ";
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = style;
function style(uid, props) {
    var main = "\n        <style>\n            " + uid + " {\n            \n            }\n        </style>\n    ";
    return "\n        " + main + "\n    ";
}
;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lyts_core_view_components_page_Page__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(32);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Page1 = /** @class */ (function (_super) {
    __extends(Page1, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Page1(route) {
        var _this = _super.call(this, route) || this;
        _this._content = _super.prototype.getFirst.call(_this, "#" + _this.uid + "_content");
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------
    Page1.prototype.render = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */])(this.uid, {});
    };
    Page1.prototype.free = function () {
        // release memory
        __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].log("REMOVED:", this.uid);
    };
    Page1.prototype.ready = function () {
        this.init();
    };
    Page1.prototype.show = function () {
    };
    Page1.prototype.hide = function () {
    };
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Page1.prototype.init = function () {
        try {
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].error("Page1.init()", err);
        }
    };
    return Page1;
}(__WEBPACK_IMPORTED_MODULE_0__lyts_core_view_components_page_Page__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (Page1);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = view;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style__ = __webpack_require__(33);

function view(uid, props) {
    props = props || {};
    return "\n            <div id=\"" + uid + "\" class=\"\">\n                " + Object(__WEBPACK_IMPORTED_MODULE_0__style__["a" /* default */])(uid, props) + "\n   \n                <h1>PAGE 1</h1>\n                        \n            </div>\n\n        ";
}


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = style;
function style(uid, props) {
    // main
    var main = "\n        <style>\n            \n        </style>      \n    ";
    return "\n        " + main + "\n           \n    ";
}
;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lyts_core_view_components_page_Page__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(35);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Page2 = /** @class */ (function (_super) {
    __extends(Page2, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Page2(route) {
        var _this = _super.call(this, route) || this;
        _this._content = _super.prototype.getFirst.call(_this, "#" + _this.uid + "_content");
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------
    Page2.prototype.render = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_2__view__["a" /* default */])(this.uid, {});
    };
    Page2.prototype.free = function () {
        // release memory
        __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].log("REMOVED:", this.uid);
    };
    Page2.prototype.ready = function () {
        this.init();
    };
    Page2.prototype.show = function () {
    };
    Page2.prototype.hide = function () {
    };
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Page2.prototype.init = function () {
        try {
        }
        catch (err) {
            __WEBPACK_IMPORTED_MODULE_1__lyts_core_commons_console__["a" /* default */].error("Page2.init()", err);
        }
    };
    return Page2;
}(__WEBPACK_IMPORTED_MODULE_0__lyts_core_view_components_page_Page__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (Page2);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = view;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style__ = __webpack_require__(36);

function view(uid, props) {
    props = props || {};
    return "\n            <div id=\"" + uid + "\" class=\"\">\n                " + Object(__WEBPACK_IMPORTED_MODULE_0__style__["a" /* default */])(uid, props) + "\n   \n                <h1>PAGE 2</h1>\n                        \n            </div>\n\n        ";
}


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = style;
function style(uid, props) {
    // main
    var main = "\n        <style>\n            \n        </style>      \n    ";
    return "\n        " + main + "\n           \n    ";
}
;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_ModelApplicationContext__ = __webpack_require__(38);


/**
 * Main APPLICATION controller.
 * Use this singleton to access application status ang global methods.
 */
var ApplicationController = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function ApplicationController() {
    }
    Object.defineProperty(ApplicationController.prototype, "events", {
        // ------------------------------------------------------------------------
        //                      p r o p e r t i e s
        // ------------------------------------------------------------------------
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__["a" /* default */].Application.events;
        },
        enumerable: true,
        configurable: true
    });
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    /**
     * Return application context when ready
     * @param {Listener} callback Pass to listener a Context object
     * @param {boolean} force Use to reload app_context
     */
    ApplicationController.prototype.ready = function (callback, force) {
        if (!!this._app_context || !!force) {
            __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__["a" /* default */].lang.funcInvoke(callback, this._app_context);
        }
        else {
            // creates application context
            this._app_context = new __WEBPACK_IMPORTED_MODULE_1__model_ModelApplicationContext__["a" /* default */]();
            __WEBPACK_IMPORTED_MODULE_0__lyts_core_ly__["a" /* default */].lang.funcInvoke(callback, this._app_context);
        }
    };
    ApplicationController.instance = function () {
        if (null == ApplicationController.__instance) {
            ApplicationController.__instance = new ApplicationController();
        }
        return ApplicationController.__instance;
    };
    return ApplicationController;
}());
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["a"] = (ApplicationController.instance());


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ModelApplicationContext = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function ModelApplicationContext() {
        this._data = {};
    }
    Object.defineProperty(ModelApplicationContext.prototype, "data", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return ModelApplicationContext;
}());
/* harmony default export */ __webpack_exports__["a"] = (ModelApplicationContext);


/***/ })
/******/ ]);