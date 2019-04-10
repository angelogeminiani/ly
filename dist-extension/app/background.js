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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lyts_chrome_extension/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lyts/lyts_core/application/Application.ts":
/*!***************************************************!*\
  !*** ./lyts/lyts_core/application/Application.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_events_Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commons/events/Events */ "./lyts/lyts_core/commons/events/Events.ts");
/* harmony import */ var _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commons/collections/Dictionary */ "./lyts/lyts_core/commons/collections/Dictionary.ts");
/* harmony import */ var _commons_BaseObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../commons/BaseObject */ "./lyts/lyts_core/commons/BaseObject.ts");
/* harmony import */ var _view_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/i18n */ "./lyts/lyts_core/view/i18n.ts");
/* harmony import */ var _commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../commons/events/EventEmitter */ "./lyts/lyts_core/commons/events/EventEmitter.ts");
/* harmony import */ var _commons_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../commons/lang */ "./lyts/lyts_core/commons/lang.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var ApplicationEvents = /** @class */ (function () {
    function ApplicationEvents() {
        this._listeners = new _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_1__["Dictionary"]();
    }
    ApplicationEvents.prototype.on = function (scope, eventName, listener) {
        var key = ApplicationEvents.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new _commons_events_Events__WEBPACK_IMPORTED_MODULE_0__["default"]());
        }
        this._listeners.get(key).on(eventName, listener.bind(scope));
    };
    ApplicationEvents.prototype.once = function (scope, eventName, listener) {
        var key = ApplicationEvents.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new _commons_events_Events__WEBPACK_IMPORTED_MODULE_0__["default"]());
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
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var keys = this._listeners.keys();
        for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
            var key = keys_1[_b];
            if (this._listeners.containsKey(key)) {
                (_a = this._listeners.get(key)).emit.apply(_a, [eventName].concat(args));
            }
        }
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
        _this._events = new _commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_4__["default"]();
        _this._scope = new _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_1__["Dictionary"]();
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
        _view_i18n__WEBPACK_IMPORTED_MODULE_3__["default"].on(this, this.EVENT_CHANGE_LANG, _commons_lang__WEBPACK_IMPORTED_MODULE_5__["default"].funcDebounce(this, this.oni18nLangChange, 400, true));
        _view_i18n__WEBPACK_IMPORTED_MODULE_3__["default"].on(this, this.EVENT_LOCALIZED, _commons_lang__WEBPACK_IMPORTED_MODULE_5__["default"].funcDebounce(this, this.oni18nLocalized, 400, true));
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
    Application._EVENT_CHANGE_LANG = _view_i18n__WEBPACK_IMPORTED_MODULE_3__["default"].EVENT_CHANGE_LANG;
    Application._EVENT_LOCALIZED = _view_i18n__WEBPACK_IMPORTED_MODULE_3__["default"].EVENT_LOCALIZED;
    return Application;
}(_commons_BaseObject__WEBPACK_IMPORTED_MODULE_2__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Application.instance());


/***/ }),

/***/ "./lyts/lyts_core/commons/BaseObject.ts":
/*!**********************************************!*\
  !*** ./lyts/lyts_core/commons/BaseObject.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ "./lyts/lyts_core/commons/random.ts");

var BaseObject = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function BaseObject() {
        this._uid = _random__WEBPACK_IMPORTED_MODULE_0__["default"].uniqueId(BaseObject.PREFIX);
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
/* harmony default export */ __webpack_exports__["default"] = (BaseObject);


/***/ }),

/***/ "./lyts/lyts_core/commons/MD5.ts":
/*!***************************************!*\
  !*** ./lyts/lyts_core/commons/MD5.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// credits: http://pajhome.org.uk/crypt/md5/md5.html
// ------------------------------------------------------------------------
//                      p r i v a t e
// ------------------------------------------------------------------------
function md5cycle(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
}
function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
}
function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function md51(s) {
    var txt = '';
    var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
    for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++)
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++)
            tail[i] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
}
/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) {
    var md5blks = [], i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
}
var hex_chr = '0123456789abcdef'.split('');
function rhex(n) {
    var s = '', j = 0;
    for (; j < 4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
    return s;
}
function hex(x) {
    for (var i = 0; i < x.length; i++)
        x[i] = rhex(x[i]);
    return x.join('');
}
function md5(s) {
    return hex(md51(s));
}
/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */
var add32 = function (a, b) {
    return (a + b) & 0xFFFFFFFF;
};
if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
    add32 = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
}
// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------
var MD5 = /** @class */ (function () {
    function MD5() {
    }
    MD5.encrypt = function (value) {
        return md5(value);
    };
    return MD5;
}());
/* harmony default export */ __webpack_exports__["default"] = (MD5);


/***/ }),

/***/ "./lyts/lyts_core/commons/arrays.ts":
/*!******************************************!*\
  !*** ./lyts/lyts_core/commons/arrays.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ly */ "./lyts/lyts_core/ly.ts");

var arrays = /** @class */ (function () {
    function arrays() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    arrays.equals = function (array1, array2) {
        var response = true;
        try {
            if (!!array1 && !!array2 && array1.length === array2.length) {
                for (var i = 0; i < array1.length; i++) {
                    var val1 = array1[i];
                    var val2 = array2[i];
                    if (_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isArray(val1) && _ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isArray(val2)) {
                        response = arrays.equals(val1, val2);
                    }
                    else {
                        response = (val1 === val2);
                    }
                    if (!response) {
                        break;
                    }
                }
            }
            else {
                response = false;
            }
        }
        catch (ignored) {
            // ignored
            response = false;
        }
        return response;
    };
    arrays.createUnique = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var array = new Array();
        arrays.pushUnique.apply(arrays, [array].concat(items));
        return array;
    };
    arrays.createFlattenUnique = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var array = new Array();
        arrays.pushFlattenUnique.apply(arrays, [array].concat(items));
        return array;
    };
    arrays.push = function (array) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        array.push.apply(array, items);
    };
    arrays.pushUnique = function (array) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        items.forEach(function (item) {
            if (array.indexOf(item) < 0) {
                array.push(item);
            }
        });
    };
    arrays.pushFlatten = function (array) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        items.forEach(function (item) {
            if (_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isArray(item)) {
                arrays.pushFlatten.apply(arrays, [array].concat(item));
            }
            else {
                array.push(item);
            }
        });
    };
    arrays.pushFlattenUnique = function (array) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        items.forEach(function (item) {
            if (_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isArray(item)) {
                arrays.pushFlattenUnique.apply(arrays, [array].concat(item));
            }
            else {
                if (array.indexOf(item) < 0) {
                    array.push(item);
                }
            }
        });
    };
    arrays.removeAt = function (array, index) {
        if (!!array && array.length > 0 && index < array.length) {
            array.splice(index, 1);
        }
    };
    arrays.remove = function (array) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        items.forEach(function (item) {
            if (_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isArray(item)) {
                arrays.remove.apply(arrays, [array].concat(item));
            }
            else {
                var index = array.indexOf(item);
                if (array.indexOf(item) > -1) {
                    array.splice(index, 1);
                }
            }
        });
    };
    arrays.shuffle = function (source, create_new) {
        var _a;
        if (create_new === void 0) { create_new = false; }
        var array = create_new ? [] : source;
        if (create_new) {
            array.push.apply(array, source);
        }
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1]; // swap elements
        }
        return array;
    };
    return arrays;
}());
/* harmony default export */ __webpack_exports__["default"] = (arrays);


/***/ }),

/***/ "./lyts/lyts_core/commons/collections/Dictionary.ts":
/*!**********************************************************!*\
  !*** ./lyts/lyts_core/commons/collections/Dictionary.ts ***!
  \**********************************************************/
/*! exports provided: Dictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dictionary", function() { return Dictionary; });
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
    Dictionary.prototype.putAll = function (data) {
        var items;
        if (data instanceof Dictionary) {
            items = data._items;
        }
        else {
            items = data;
        }
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                this.put(key, items[key]);
            }
        }
    };
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

/***/ "./lyts/lyts_core/commons/console.ts":
/*!*******************************************!*\
  !*** ./lyts/lyts_core/commons/console.ts ***!
  \*******************************************/
/*! exports provided: default, LogLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ "./lyts/lyts_core/commons/random.ts");
/**
 * Extends standard console
 */

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["error"] = 0] = "error";
    LogLevel[LogLevel["warn"] = 1] = "warn";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["debug"] = 3] = "debug";
})(LogLevel || (LogLevel = {}));
var console_ext = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function console_ext() {
        this._uid = _random__WEBPACK_IMPORTED_MODULE_0__["default"].guid();
        this._level = LogLevel.info;
    }
    Object.defineProperty(console_ext.prototype, "uid", {
        // ------------------------------------------------------------------------
        //                      p r o p e r t i e s
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
    Object.defineProperty(console_ext.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
        },
        enumerable: true,
        configurable: true
    });
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
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
        if (this._level < LogLevel.warn) {
            return;
        }
        console.warn.apply(console, ["[" + this.uid + "] " + scope].concat(args));
    };
    ;
    console_ext.prototype.info = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._level < LogLevel.info) {
            return;
        }
        console.info.apply(console, ["[" + this.uid + "] " + scope].concat(args));
    };
    ;
    console_ext.prototype.debug = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._level < LogLevel.debug) {
            return;
        }
        console.log.apply(console, ["[" + this.uid + "] " + scope].concat(args));
    };
    ;
    console_ext.prototype.log = function (scope) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._level < LogLevel.info) {
            return;
        }
        console.log.apply(console, ["[" + this.uid + "] " + scope].concat(args));
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    console_ext.prototype.init = function () {
        this.uid = _random__WEBPACK_IMPORTED_MODULE_0__["default"].guid();
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
/* harmony default export */ __webpack_exports__["default"] = (console_ext.instance());



/***/ }),

/***/ "./lyts/lyts_core/commons/events/EventEmitter.ts":
/*!*******************************************************!*\
  !*** ./lyts/lyts_core/commons/events/EventEmitter.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Events */ "./lyts/lyts_core/commons/events/Events.ts");
/* harmony import */ var _BaseObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseObject */ "./lyts/lyts_core/commons/BaseObject.ts");
/* harmony import */ var _collections_Dictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../collections/Dictionary */ "./lyts/lyts_core/commons/collections/Dictionary.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
        _this._listeners = new _collections_Dictionary__WEBPACK_IMPORTED_MODULE_2__["Dictionary"]();
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    EventEmitter.prototype.on = function (scope, eventName, listener) {
        var key = EventEmitter.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new _Events__WEBPACK_IMPORTED_MODULE_0__["default"]());
        }
        this._listeners.get(key).on(eventName, listener.bind(scope));
    };
    EventEmitter.prototype.once = function (scope, eventName, listener) {
        var key = EventEmitter.key(scope);
        if (!this._listeners.containsKey(key)) {
            this._listeners.put(key, new _Events__WEBPACK_IMPORTED_MODULE_0__["default"]());
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
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!!this._listeners) {
            var keys = this._listeners.keys();
            for (var _b = 0, keys_2 = keys; _b < keys_2.length; _b++) {
                var key = keys_2[_b];
                if (this._listeners.containsKey(key)) {
                    (_a = this._listeners.get(key)).emit.apply(_a, [eventName].concat(args));
                }
            }
        }
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
}(_BaseObject__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (EventEmitter);


/***/ }),

/***/ "./lyts/lyts_core/commons/events/Events.ts":
/*!*************************************************!*\
  !*** ./lyts/lyts_core/commons/events/Events.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ly */ "./lyts/lyts_core/ly.ts");
/* harmony import */ var _collections_Dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../collections/Dictionary */ "./lyts/lyts_core/commons/collections/Dictionary.ts");


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
        this._events = new _collections_Dictionary__WEBPACK_IMPORTED_MODULE_1__["Dictionary"]();
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
        var names = _ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isArray(event_names)
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
            _ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.warn("Events._registerEvent", "Maximum listener reached, new Listener not added", this.getMaxListeners());
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
/* harmony default export */ __webpack_exports__["default"] = (Events);


/***/ }),

/***/ "./lyts/lyts_core/commons/format.ts":
/*!******************************************!*\
  !*** ./lyts/lyts_core/commons/format.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ly */ "./lyts/lyts_core/ly.ts");

var VAR_MATCH_REGEX = /\{\{\s*(.*?)\s*\}\}/g;
/**
 * Utility class
 */
var format = /** @class */ (function () {
    function format() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    format.replace = function (template, callback) {
        // don't touch the template if it is not a string
        if (typeof template !== 'string') {
            return template;
        }
        return template.replace(VAR_MATCH_REGEX, function (match, varName) {
            return callback(varName);
        });
    };
    format.template = function (template, model) {
        if (model === void 0) { model = {}; }
        // don't touch the template if it is not a string
        if (typeof template !== 'string') {
            return template;
        }
        return template.replace(VAR_MATCH_REGEX, function (match, varName) {
            try {
                // defaultResolver never throws
                return _ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.toString(_ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.get(model, varName));
            }
            catch (e) {
                // if your resolver throws, we proceed with the default resolver
                return '';
            }
        });
    };
    /**
     *
     * @param value  {{value:type:opt1:opt....}}
     * i.e. {{1234.2456666:number:2:€}} -> 1234,24€
     */
    format.value = function (value) {
        try {
            // check for pattern {{value:number/date:opt:opt}}
            if (value.indexOf("{{") > -1 && value.indexOf("}}") > -1) {
                value = _ly__WEBPACK_IMPORTED_MODULE_0__["default"].format.replace(value, function (fmt_cmd) {
                    var tokens = value.split(":"); // {{1234.3445667:number:2:$}}
                    var f_value = tokens[0];
                    var f_type = tokens.length > 1 ? tokens[1] : "";
                    if (f_type === "number") {
                        var decimals = tokens.length > 2 ? _ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.toInt(tokens[2]) : 0;
                        var suffix = tokens.length > 3 ? tokens[3] : "";
                        return _ly__WEBPACK_IMPORTED_MODULE_0__["default"].math.round(_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.toFloat(f_value), decimals) + suffix;
                    }
                    return f_value;
                });
            }
        }
        catch (ignored) {
        }
        return value;
    };
    format.date = function (date, locales, options) {
        try {
            if (!!locales) {
                if (_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isArray(locales) || locales.length < 6) {
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
                    return date.toLocaleString(locales, options);
                }
                else if (_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.isString(locales)) {
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
                    f = f.replace(/mm/g, _ly__WEBPACK_IMPORTED_MODULE_0__["default"].strings.fillLeft(String(date.getMonth() + 1), '0', 2));
                    f = f.replace(/DDD/g, nd.substr(0, 3).toUpperCase());
                    f = f.replace(/Ddd/g, nd.substr(0, 3));
                    f = f.replace(/DD\*/g, nd.toUpperCase());
                    f = f.replace(/Dd\*/g, nd);
                    f = f.replace(/dd/g, _ly__WEBPACK_IMPORTED_MODULE_0__["default"].strings.fillLeft(String(date.getDate()), '0', 2));
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
/* harmony default export */ __webpack_exports__["default"] = (format);


/***/ }),

/***/ "./lyts/lyts_core/commons/lang.ts":
/*!****************************************!*\
  !*** ./lyts/lyts_core/commons/lang.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ly */ "./lyts/lyts_core/ly.ts");
/**
 * Utility class
 */

var langClass = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function langClass() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    langClass.prototype.parse = function (value) {
        try {
            if (this.isString(value)) {
                return JSON.parse(value);
            }
        }
        catch (err) {
        }
        return value;
    };
    // ------------------------------------------------------------------------
    //                      t o
    // ------------------------------------------------------------------------
    langClass.prototype.toString = function (value) {
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
    langClass.prototype.toArray = function (value) {
        return !!value
            ? this.isArray(value) ? value : [value]
            : [];
    };
    langClass.prototype.toBoolean = function (value, def_val) {
        return !!value
            ? value !== 'false' && value !== '0'
            : def_val;
    };
    langClass.prototype.toFloat = function (value, def_value, min, max) {
        if (def_value === void 0) { def_value = 0.0; }
        try {
            var result = parseFloat(value.replace(/,/g, '.'));
            result = this.isNaN(result) ? def_value : result;
            if (!this.isNaN(max) && result > (max || 0))
                result = max || 0;
            if (!this.isNaN(min) && result < (min || 0))
                result = min || 0;
            return result;
        }
        catch (err) {
            return def_value;
        }
    };
    langClass.prototype.toInt = function (value, def_value, min, max) {
        if (def_value === void 0) { def_value = 0; }
        try {
            var result = parseInt(value);
            result = this.isNaN(result) ? def_value : result;
            if (!this.isNaN(max) && result > (max || 0))
                result = max || 0;
            if (!this.isNaN(min) && result < (min || 0))
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
    langClass.prototype.isFunction = function (value) {
        return typeof value == 'function';
    };
    langClass.prototype.isObject = function (value) {
        return value === Object(value);
    };
    langClass.prototype.isArray = function (value) {
        return !!Array.isArray
            ? Array.isArray(value)
            : value && typeof value == 'object' && typeof value.length == 'number' && toString.call(value) == '[object Array]' || false;
    };
    langClass.prototype.isArguments = function (value) {
        return value && typeof value == 'object' && typeof value.length == 'number' &&
            toString.call(value) == '[object Arguments]' || false;
    };
    langClass.prototype.isBoolean = function (value) {
        return value === true || value === false ||
            value && typeof value == 'object' && toString.call(value) == '[object Boolean]' || false;
    };
    langClass.prototype.isString = function (value) {
        return typeof value == 'string' ||
            value && typeof value == 'object' && toString.call(value) == '[object String]' || false;
    };
    langClass.prototype.isNumber = function (value) {
        return typeof value == 'number' ||
            value && typeof value == 'object' && toString.call(value) == '[object Number]' || false;
    };
    langClass.prototype.isNaN = function (value) {
        return isNaN(value);
    };
    langClass.isDate = function (value) {
        return value && typeof value == 'object' && toString.call(value) == '[object Date]' || false;
    };
    langClass.prototype.isUndefined = function (value) {
        return typeof value == 'undefined';
    };
    langClass.prototype.isRegExp = function (value) {
        return value && typeof value == 'object' && toString.call(value) == '[object RegExp]' || false;
    };
    langClass.prototype.isEmail = function (value) {
        return this.isString(value) && this._validateEmail(value);
    };
    langClass.prototype.isConstructor = function (f) {
        try {
            return !!f.prototype && !!f.prototype.constructor.name;
        }
        catch (err) {
            return false;
        }
    };
    langClass.prototype.funcName = function (func) {
        var response = '';
        try {
            if (!!func) {
                if (!!func.name) {
                    response = func.name;
                }
                else if (!!func.prototype && !!func.prototype.name) {
                    response = func.prototype.name;
                }
            }
        }
        catch (err) {
        }
        return response;
    };
    // ------------------------------------------------------------------------
    //                      u t i l s
    // ------------------------------------------------------------------------
    /**
     * Evaluate a script or an object
     * @param text
     * @return {*}
     */
    langClass.prototype.evalScript = function (text) {
        if (!!text && !!eval) {
            return eval.call(this, text);
        }
        return {};
    };
    langClass.prototype.noCacheLink = function (url) {
        if (url.indexOf("?") === -1)
            url += "?no_cache=" + new Date().getTime();
        else
            url += "&no_cache=" + new Date().getTime();
        return url;
    };
    /**
     * Invoke a function. Shortcut for "func.call(this, ...args)"
     */
    langClass.prototype.funcInvoke = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var self = this;
        if (!!func && self.isFunction(func)) {
            if (args.length === 0) {
                return func.call(self);
            }
            else {
                return func.call.apply(func, [self].concat(args));
            }
        }
        return null;
    };
    langClass.prototype.funcTryInvoke = function (context, func_name) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        try {
            var func = _ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.get(context, func_name);
            return this.funcInvoke.apply(this, [func.bind(context)].concat(args));
        }
        catch (ignored) {
            // ignored
        }
        return null;
    };
    /**
     * Delays a function for the given number of milliseconds, and then calls
     * it with the arguments supplied.
     * NOTE: user "clearTimeout" with funcDelay response to
     */
    langClass.prototype.funcDelay = function (func, wait) {
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
    langClass.prototype.funcLoop = function (func, wait) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var self = this;
        var callback;
        var timer = setInterval(function () {
            var exit = !!func.apply(null, args);
            if (exit) {
                clearInterval(timer);
                self.funcInvoke.bind(self)(callback); // call with bind
            }
        }, wait || 300);
        return {
            done: function (done_callback) {
                callback = done_callback;
            }
        };
    };
    /**
     *
     * @param array
     * @param func_callback
     * @param wait
     * @param immediate
     */
    langClass.prototype.funcForEach = function (array, func_callback, wait, immediate) {
        if (wait === void 0) { wait = 300; }
        if (immediate === void 0) { immediate = true; }
        // console.log('lang.funcForEach', array);
        var self = this;
        var count = 0;
        var func_done;
        var timer = 0;
        var intervalFunction = function () {
            try {
                clearInterval(timer);
                count++;
                var exit = (count > array.length);
                if (exit) {
                    self.funcInvoke.bind(self)(func_done); // call with bind
                }
                else {
                    func_callback.call(null, array[count - 1]); // call with bind
                    timer = setInterval(intervalFunction, wait);
                }
            }
            catch (err) {
                clearInterval(timer);
                console.error('lang.funcForEach#setInterval', err);
            }
        };
        // start timer
        timer = setInterval(intervalFunction, (count === 0 && immediate) ? 300 : wait);
        return {
            done: function (done_callback) {
                func_done = done_callback;
            }
        };
    };
    /**
     * Returns a function that will be executed at most one time, no matter how
     * often you call it. Useful for lazy initialization.
     */
    langClass.prototype.funcOnce = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var self = this;
        var ran = false;
        var memo;
        return function () {
            if (ran)
                return memo;
            ran = true;
            memo = func.call.apply(func, [self].concat(args));
            return memo;
        };
    };
    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds.
     * If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
     */
    langClass.prototype.funcDebounce = function (context, func, wait, immediate) {
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
            var last = _ly__WEBPACK_IMPORTED_MODULE_0__["default"].random.now() - timestamp;
            var full_args = Array.prototype.slice.call(arguments).concat(args);
            if (last < wait && last > 0) {
                clearTimeout(timeout);
                timeout = setTimeout.apply(void 0, [later, wait - last].concat(full_args));
            }
            else {
                timeout = null;
                clearTimeout(timeout);
                if (!immediate) {
                    result = func.apply(context, full_args);
                }
            }
        };
        return function () {
            timestamp = _ly__WEBPACK_IMPORTED_MODULE_0__["default"].random.now();
            var callNow = immediate && !timeout;
            var full_args = Array.prototype.slice.call(arguments).concat(args);
            if (!timeout) {
                timeout = setTimeout.apply(void 0, [later, wait].concat(full_args));
            }
            if (callNow) {
                result = func.apply(context, full_args);
            }
            return result;
        };
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    langClass.prototype._validateEmail = function (email) {
        try {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        catch (err) {
            return false;
        }
    };
    langClass.instance = function () {
        if (null == langClass.__instance) {
            langClass.__instance = new langClass();
        }
        return langClass.__instance;
    };
    return langClass;
}());
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
var lang = langClass.instance();
/* harmony default export */ __webpack_exports__["default"] = (lang);


/***/ }),

/***/ "./lyts/lyts_core/commons/math.ts":
/*!****************************************!*\
  !*** ./lyts/lyts_core/commons/math.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Math class
 */
var mathClass = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function mathClass() {
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    mathClass.prototype.round = function (value, decimals) {
        if (decimals === void 0) { decimals = 0; }
        if (decimals === 0) {
            return Math.round(value);
        }
        else {
            var pow = Math.pow(10, decimals);
            return Math.round(value * pow) / pow;
        }
    };
    mathClass.prototype.ceil = function (value, decimals) {
        if (decimals === void 0) { decimals = 0; }
        if (decimals === 0) {
            return Math.ceil(value);
        }
        else {
            var pow = Math.pow(10, decimals);
            return Math.ceil(value * pow) / pow;
        }
    };
    mathClass.prototype.floor = function (value, decimals) {
        if (decimals === void 0) { decimals = 0; }
        if (decimals === 0) {
            return Math.floor(value);
        }
        else {
            var pow = Math.pow(10, decimals);
            return Math.floor(value * pow) / pow;
        }
    };
    mathClass.instance = function () {
        if (null == mathClass.__instance) {
            mathClass.__instance = new mathClass();
        }
        return mathClass.__instance;
    };
    return mathClass;
}());
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
var math = mathClass.instance();
/* harmony default export */ __webpack_exports__["default"] = (math);


/***/ }),

/***/ "./lyts/lyts_core/commons/objects.ts":
/*!*******************************************!*\
  !*** ./lyts/lyts_core/commons/objects.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang */ "./lyts/lyts_core/commons/lang.ts");

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
        path = _lang__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(path) ? path : path.split('.');
        var varName = path[pathIndex];
        var value = scope[varName];
        if (pathIndex === path.length - 1) {
            // It's a leaf, return whatever it is
            return value;
        }
        return objects.get(value, path, ++pathIndex);
    };
    objects.set = function (scope, path, value) {
        if (typeof scope !== 'object' || scope === null || scope === undefined) {
            return;
        }
        var paths = _lang__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(path) ? path : path.split('.');
        var count = 0;
        paths.forEach(function (attr) {
            var is_last = count === paths.length - 1;
            if (!scope.hasOwnProperty(attr)) {
                scope[attr] = {};
            }
            if (is_last) {
                scope[attr] = value;
            }
            else {
                scope = scope[attr];
            }
            count++;
        });
    };
    objects.default = function (scope, path, value) {
        var curr_val = objects.get(scope, path);
        if (!curr_val) {
            objects.set(scope, path, value);
        }
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
/* harmony default export */ __webpack_exports__["default"] = (objects);


/***/ }),

/***/ "./lyts/lyts_core/commons/random.ts":
/*!******************************************!*\
  !*** ./lyts/lyts_core/commons/random.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (random);


/***/ }),

/***/ "./lyts/lyts_core/commons/strings.ts":
/*!*******************************************!*\
  !*** ./lyts/lyts_core/commons/strings.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang */ "./lyts/lyts_core/commons/lang.ts");

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
        if (_lang__WEBPACK_IMPORTED_MODULE_0__["default"].isString(find)) {
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
/* harmony default export */ __webpack_exports__["default"] = (strings);


/***/ }),

/***/ "./lyts/lyts_core/ly.ts":
/*!******************************!*\
  !*** ./lyts/lyts_core/ly.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons/console */ "./lyts/lyts_core/commons/console.ts");
/* harmony import */ var _commons_lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commons/lang */ "./lyts/lyts_core/commons/lang.ts");
/* harmony import */ var _commons_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commons/format */ "./lyts/lyts_core/commons/format.ts");
/* harmony import */ var _commons_arrays__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commons/arrays */ "./lyts/lyts_core/commons/arrays.ts");
/* harmony import */ var _commons_strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commons/strings */ "./lyts/lyts_core/commons/strings.ts");
/* harmony import */ var _commons_objects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commons/objects */ "./lyts/lyts_core/commons/objects.ts");
/* harmony import */ var _commons_MD5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./commons/MD5 */ "./lyts/lyts_core/commons/MD5.ts");
/* harmony import */ var _commons_math__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./commons/math */ "./lyts/lyts_core/commons/math.ts");
/* harmony import */ var _commons_random__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./commons/random */ "./lyts/lyts_core/commons/random.ts");
/* harmony import */ var _view_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view/browser */ "./lyts/lyts_core/view/browser.ts");
/* harmony import */ var _view_installer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./view/installer */ "./lyts/lyts_core/view/installer.ts");
/* harmony import */ var _view_cookies__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./view/cookies */ "./lyts/lyts_core/view/cookies.ts");
/* harmony import */ var _view_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./view/dom */ "./lyts/lyts_core/view/dom.ts");
/* harmony import */ var _view_i18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./view/i18n */ "./lyts/lyts_core/view/i18n.ts");
/* harmony import */ var _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./commons/collections/Dictionary */ "./lyts/lyts_core/commons/collections/Dictionary.ts");
/* harmony import */ var _commons_events_Events__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./commons/events/Events */ "./lyts/lyts_core/commons/events/Events.ts");
/* harmony import */ var _commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./commons/events/EventEmitter */ "./lyts/lyts_core/commons/events/EventEmitter.ts");
/* harmony import */ var _net_HttpClient__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./net/HttpClient */ "./lyts/lyts_core/net/HttpClient.ts");
/* harmony import */ var _view_components_Component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./view/components/Component */ "./lyts/lyts_core/view/components/Component.ts");
/* harmony import */ var _application_Application__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./application/Application */ "./lyts/lyts_core/application/Application.ts");
//-- static --//














//-- classes --//




//-- views --//

//-- singleton --//

var root = window;
// ------------------------------------------------------------------------
//                      l y
// ------------------------------------------------------------------------
var ly = {
    window: root,
    console: _commons_console__WEBPACK_IMPORTED_MODULE_0__["default"],
    lang: _commons_lang__WEBPACK_IMPORTED_MODULE_1__["default"],
    format: _commons_format__WEBPACK_IMPORTED_MODULE_2__["default"],
    arrays: _commons_arrays__WEBPACK_IMPORTED_MODULE_3__["default"],
    strings: _commons_strings__WEBPACK_IMPORTED_MODULE_4__["default"],
    objects: _commons_objects__WEBPACK_IMPORTED_MODULE_5__["default"],
    MD5: _commons_MD5__WEBPACK_IMPORTED_MODULE_6__["default"],
    math: _commons_math__WEBPACK_IMPORTED_MODULE_7__["default"],
    random: _commons_random__WEBPACK_IMPORTED_MODULE_8__["default"],
    browser: _view_browser__WEBPACK_IMPORTED_MODULE_9__["default"],
    installer: _view_installer__WEBPACK_IMPORTED_MODULE_10__["default"],
    cookies: _view_cookies__WEBPACK_IMPORTED_MODULE_11__["default"],
    dom: _view_dom__WEBPACK_IMPORTED_MODULE_12__["default"],
    i18n: _view_i18n__WEBPACK_IMPORTED_MODULE_13__["default"],
    Events: _commons_events_Events__WEBPACK_IMPORTED_MODULE_15__["default"],
    EventEmitter: _commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_16__["default"],
    Dictionary: _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_14__["Dictionary"],
    HttpClient: _net_HttpClient__WEBPACK_IMPORTED_MODULE_17__["HttpClient"],
    //-- v i e w --//
    Component: _view_components_Component__WEBPACK_IMPORTED_MODULE_18__["default"],
    //-- s i n g l e t o n --//
    Application: _application_Application__WEBPACK_IMPORTED_MODULE_19__["default"]
};
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (ly);


/***/ }),

/***/ "./lyts/lyts_core/net/HttpClient.ts":
/*!******************************************!*\
  !*** ./lyts/lyts_core/net/HttpClient.ts ***!
  \******************************************/
/*! exports provided: DEFAULT_REQUEST_OPTIONS, HttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_REQUEST_OPTIONS", function() { return DEFAULT_REQUEST_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpClient", function() { return HttpClient; });
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

/***/ "./lyts/lyts_core/view/browser.ts":
/*!****************************************!*\
  !*** ./lyts/lyts_core/view/browser.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commons/lang */ "./lyts/lyts_core/commons/lang.ts");
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
    browser.prototype.getParameters = function (query) {
        if (query === void 0) { query = ''; }
        query = query || location.search;
        query = query.split('?').length > 1 ? query.split('?')[1] : query;
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            }
            else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            }
            else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    };
    // ------------------------------------------------------------------------
    //                      e v e n t s
    // ------------------------------------------------------------------------
    browser.prototype.onResize = function (callback, debounce) {
        if (debounce === void 0) { debounce = 200; }
        //-- event hooks --//
        if (!!window) {
            this._on_resize_callback = callback;
            this._debounce_wait = debounce;
            if (!!this._debounce_func) {
                window.removeEventListener("resize", this._debounce_func);
            }
            this._debounce_func = _commons_lang__WEBPACK_IMPORTED_MODULE_0__["default"].funcDebounce(this, this._resize, this._debounce_wait);
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
/* harmony default export */ __webpack_exports__["default"] = (browser.instance());


/***/ }),

/***/ "./lyts/lyts_core/view/components/Component.ts":
/*!*****************************************************!*\
  !*** ./lyts/lyts_core/view/components/Component.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_events_Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../commons/events/Events */ "./lyts/lyts_core/commons/events/Events.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./lyts/lyts_core/view/dom.ts");
/* harmony import */ var _commons_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../commons/lang */ "./lyts/lyts_core/commons/lang.ts");
/* harmony import */ var _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../commons/collections/Dictionary */ "./lyts/lyts_core/commons/collections/Dictionary.ts");
/* harmony import */ var _commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../commons/events/EventEmitter */ "./lyts/lyts_core/commons/events/EventEmitter.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../i18n */ "./lyts/lyts_core/view/i18n.ts");
/* harmony import */ var _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ElementWrapper */ "./lyts/lyts_core/view/components/ElementWrapper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
    function Component(element) {
        var _this = _super.call(this) || this;
        _this._native_events = new _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_3__["Dictionary"]();
        _this._native_elements = new _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_3__["Dictionary"]();
        _this._element = !!element ? element : _this._createElement(_this.render());
        _this._element_wrapper = new _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__["default"](_this, _this._element);
        _this._data = {};
        _this._showing = !_this.element.classHas("hidden");
        _this._normalizeElements();
        _this.localize();
        // auto-localize
        _i18n__WEBPACK_IMPORTED_MODULE_5__["default"].on(_this, _i18n__WEBPACK_IMPORTED_MODULE_5__["default"].EVENT_CHANGE_LANG, _this.localize);
        return _this;
    }
    Component.prototype.remove = function () {
        this._free();
    };
    Object.defineProperty(Component.prototype, "is_visible", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._showing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "data", {
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
    Component.prototype.hide = function (animate) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].classAdd(this._element, 'hidden');
        this._showing = false;
    };
    Component.prototype.show = function (animate) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].classRemove(this._element, 'hidden');
        this._showing = true;
    };
    // ------------------------------------------------------------------------
    //                      d o m
    // ------------------------------------------------------------------------
    Component.prototype.localize = function (trace) {
        _i18n__WEBPACK_IMPORTED_MODULE_5__["default"].localize(this._element, trace);
    };
    Component.prototype.get = function (selector) {
        var result = [];
        var elements = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].get(selector, this._element);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            result.push(new _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__["default"](this, elem));
        }
        return result;
    };
    Component.prototype.getFirst = function (selector) {
        return new _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__["default"](this, _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getFirst(selector, this._element));
    };
    Component.prototype.getLast = function (selector) {
        return new _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__["default"](this, _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getLast(selector, this._element));
    };
    Component.prototype.appendTo = function (selector, clean_parent) {
        if (clean_parent === void 0) { clean_parent = false; }
        var elem = (selector instanceof _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__["default"])
            ? selector
            : new _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__["default"](this, _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getFirst(selector));
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
                // this._normalizeElement(child); // ALREADY INVOKED in _createElement
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
            var classes = _commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].toArray(class_name);
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
            var classes = _commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].toArray(class_name);
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
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].classAdd(elem, class_name);
    };
    Component.prototype.classRemove = function (selector, class_name) {
        var elem = this._getFirstElement(selector);
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].classRemove(elem, class_name);
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
            return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getValue(elem);
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
            this._removeEventListener(elem, _commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].toArray(event_names));
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
        _i18n__WEBPACK_IMPORTED_MODULE_5__["default"].off(this, _i18n__WEBPACK_IMPORTED_MODULE_5__["default"].EVENT_CHANGE_LANG);
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
        // events on root
        this._normalizeElement(this._element, true);
    };
    Component.prototype._resolveElement = function (elem_or_selector, defVal) {
        if (!!elem_or_selector) {
            if (_commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].isString(elem_or_selector)) {
                var found = this._getFirstElement(elem_or_selector);
                if (!!found) {
                    return this._normalizeElement(found, false);
                }
            }
            else {
                var found = elem_or_selector;
                if (!!found) {
                    return this._normalizeElement(found, false);
                }
            }
        }
        return !!defVal ? this._normalizeElement(defVal, false) : null;
    };
    Component.prototype._getElement = function (selector) {
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].get(selector, this._element);
    };
    Component.prototype._getFirstElement = function (selector) {
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getFirst(selector, this._element);
    };
    Component.prototype._getLastElement = function (selector) {
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getLast(selector, this._element);
    };
    Component.prototype._addEventListener = function (elem, event_name, listener) {
        var hash_code = this._hash(elem);
        if (!this._native_events.containsKey(hash_code)) {
            this._native_events.put(hash_code, new _commons_events_Events__WEBPACK_IMPORTED_MODULE_0__["default"]());
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
        // console.log("Component_removeEventlisteners", elem, event_names, counter);
        return counter;
    };
    Component.prototype._createElement = function (html) {
        html = html.trim();
        return this._normalizeElement(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].newElement(html), true);
    };
    Component.prototype._normalizeElement = function (root_elem, deep) {
        var _this = this;
        // add hash
        this._hash(root_elem);
        // events on child
        if (deep) {
            _dom__WEBPACK_IMPORTED_MODULE_1__["default"].forEachChild(root_elem, function (elem) {
                _this._normalizeElement(elem, false);
            }, true);
        }
        //... do more stuff here
        return root_elem;
    };
    Component.prototype._hash = function (elem) {
        if (null != elem) {
            var hash_code = _ElementWrapper__WEBPACK_IMPORTED_MODULE_6__["default"].hash(elem);
            if (!!hash_code) {
                // add new element reference to internal hash dictionary
                this._native_elements.put(hash_code, elem);
            }
            return hash_code;
        }
        return '';
    };
    return Component;
}(_commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_4__["default"]));
// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (Component);


/***/ }),

/***/ "./lyts/lyts_core/view/components/ElementWrapper.ts":
/*!**********************************************************!*\
  !*** ./lyts/lyts_core/view/components/ElementWrapper.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../commons/random */ "./lyts/lyts_core/commons/random.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./lyts/lyts_core/view/dom.ts");
/* harmony import */ var _ly__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ly */ "./lyts/lyts_core/ly.ts");



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
    Object.defineProperty(ElementWrapper.prototype, "hash", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this.getAttribute(ElementWrapper.HASH_ATTRIBUTE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "htmlElement", {
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
    Object.defineProperty(ElementWrapper.prototype, "scrollTop", {
        get: function () {
            if (!!this._element) {
                return this._element.scrollTop;
            }
            return 0;
        },
        set: function (value) {
            if (!!this._element) {
                this._element.scrollTop = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "scrollLeft", {
        get: function () {
            if (!!this._element) {
                return this._element.scrollLeft;
            }
            return 0;
        },
        set: function (value) {
            if (!!this._element) {
                this._element.scrollLeft = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "scrollWidth", {
        get: function () {
            if (!!this._element) {
                return this._element.scrollWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "scrollHeight", {
        get: function () {
            if (!!this._element) {
                return this._element.scrollHeight;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    ElementWrapper.prototype.scrollBy = function (x, y) {
        if (!!this._element) {
            return this._element.scrollBy(x, y);
        }
    };
    ElementWrapper.prototype.scrollTo = function (x, y) {
        if (!!this._element) {
            return this._element.scrollTo(x, y);
        }
    };
    Object.defineProperty(ElementWrapper.prototype, "offsetWidth", {
        get: function () {
            if (!!this._element) {
                return this._element.offsetWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "offsetHeight", {
        get: function () {
            if (!!this._element) {
                return this._element.offsetHeight;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "offsetTop", {
        get: function () {
            if (!!this._element) {
                return this._element.offsetTop;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "clientWidth", {
        get: function () {
            if (!!this._element) {
                return this._element.clientWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "clientHeight", {
        get: function () {
            if (!!this._element) {
                return this._element.clientHeight;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "clientLeft", {
        get: function () {
            if (!!this._element) {
                return this._element.clientLeft;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "clientTop", {
        get: function () {
            if (!!this._element) {
                return this._element.clientTop;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementWrapper.prototype, "children", {
        get: function () {
            var _this = this;
            var response = [];
            if (!!this._element) {
                _dom__WEBPACK_IMPORTED_MODULE_1__["default"].forEachChild(this._element, function (elem) {
                    response.push(new ElementWrapper(_this._owner, elem));
                });
            }
            return response;
        },
        enumerable: true,
        configurable: true
    });
    ElementWrapper.prototype.forEachChild = function (func, deep) {
        var _this = this;
        if (deep === void 0) { deep = false; }
        if (!!this._element) {
            _dom__WEBPACK_IMPORTED_MODULE_1__["default"].forEachChild(this._element, function (elem) {
                var child = new ElementWrapper(_this._owner, elem);
                func(child);
            }, deep);
        }
    };
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
    ElementWrapper.prototype.onClick = function (handler, context) {
        this.addEventListener("click", _ly__WEBPACK_IMPORTED_MODULE_2__["default"].lang.funcDebounce(!!context ? context : this, handler, 500, true));
    };
    ElementWrapper.prototype.offClick = function () {
        this.removeEventListener("click");
    };
    ElementWrapper.prototype.onEnterKey = function (handler, context) {
        var _self = !!context ? context : this;
        this.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                handler.call(_self, e);
            }
        });
    };
    ElementWrapper.prototype.classAdd = function (class_name) {
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].classAdd(this._element, class_name);
    };
    ElementWrapper.prototype.classRemove = function (class_name) {
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].classRemove(this._element, class_name);
    };
    ElementWrapper.prototype.classHas = function (class_name) {
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].classHas(this._element, class_name);
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
    ElementWrapper.prototype.removeAttribute = function (name) {
        if (!!this._element) {
            this._element.removeAttribute(name);
        }
    };
    ElementWrapper.prototype.createAttribute = function (name) {
        if (!!this._element) {
            if (!this._element.hasAttribute(name)) {
                this._element.setAttributeNode(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].createAttribute(name));
            }
        }
    };
    ElementWrapper.prototype.value = function (value) {
        try {
            if (!!this._element) {
                if (value != undefined) {
                    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].setValue(this._element, value);
                }
                return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getValue(this._element);
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
            _dom__WEBPACK_IMPORTED_MODULE_1__["default"].forEachChild(this._element, function (elem) {
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
                var hash_code = _commons_random__WEBPACK_IMPORTED_MODULE_0__["default"].id();
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
/* harmony default export */ __webpack_exports__["default"] = (ElementWrapper);


/***/ }),

/***/ "./lyts/lyts_core/view/cookies.ts":
/*!****************************************!*\
  !*** ./lyts/lyts_core/view/cookies.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "./lyts/lyts_core/view/browser.ts");

/**
 * Cookies Helper class
 */
var cookies = /** @class */ (function () {
    function cookies() {
    }
    cookies.create = function (name, value, days) {
        if (_browser__WEBPACK_IMPORTED_MODULE_0__["default"].isReady()) {
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
        if (_browser__WEBPACK_IMPORTED_MODULE_0__["default"].isReady()) {
            cookies.create(name, '', -1);
        }
    };
    /**
     * Remove all cookies
     */
    cookies.clear = function () {
        if (_browser__WEBPACK_IMPORTED_MODULE_0__["default"].isReady()) {
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
/* harmony default export */ __webpack_exports__["default"] = (cookies);


/***/ }),

/***/ "./lyts/lyts_core/view/dom.ts":
/*!************************************!*\
  !*** ./lyts/lyts_core/view/dom.ts ***!
  \************************************/
/*! exports provided: SelectorType, SelectorParser, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectorType", function() { return SelectorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectorParser", function() { return SelectorParser; });
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "./lyts/lyts_core/view/browser.ts");
/* harmony import */ var _commons_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commons/strings */ "./lyts/lyts_core/commons/strings.ts");
/* harmony import */ var _commons_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../commons/lang */ "./lyts/lyts_core/commons/lang.ts");
/* harmony import */ var _ly__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ly */ "./lyts/lyts_core/ly.ts");




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
                        return _commons_strings__WEBPACK_IMPORTED_MODULE_1__["default"].startWith(attr_value, this.value);
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
                var selector = _commons_strings__WEBPACK_IMPORTED_MODULE_1__["default"].replaceAll(["'", "[", "]"], "", this._selector);
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
        return !!selector ? _commons_strings__WEBPACK_IMPORTED_MODULE_1__["default"].startWith(selector, "#") : false;
    };
    SelectorParser.isSelectorCLASS = function (selector) {
        return !!selector ? _commons_strings__WEBPACK_IMPORTED_MODULE_1__["default"].startWith(selector, ".") : false;
    };
    SelectorParser.isSelectorATTR = function (selector) {
        return !!selector ? _commons_strings__WEBPACK_IMPORTED_MODULE_1__["default"].startWith(selector, "[") && selector.indexOf("]") > -1 : false;
    };
    return SelectorParser;
}());

/**
 * Default Export class.
 */
var doc = document;
var win = window;
var domClass = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function domClass() {
        this._readyList = [];
        this._ready = (doc.readyState === "complete" || (!doc.attachEvent && doc.readyState === "interactive"));
        if (!this._ready) {
            if (doc.addEventListener) {
                // first choice is DOMContentLoaded event
                doc.addEventListener("DOMContentLoaded", this.onDocumentReady.bind(this), false);
                // backup is window load event
                win.addEventListener("load", this.onDocumentReady.bind(this), false);
            }
            else {
                // must be IE
                doc.attachEvent("onreadystatechange", this.onDocumentReadyStateChange.bind(this));
                win.attachEvent("onload", this.onDocumentReady.bind(this));
            }
        }
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    domClass.prototype.ready = function (callback, bind_context) {
        if (_ly__WEBPACK_IMPORTED_MODULE_3__["default"].lang.isFunction(callback)) {
            var callback_to_invoke = callback.bind(bind_context || this);
            if (dom._ready) {
                _ly__WEBPACK_IMPORTED_MODULE_3__["default"].lang.funcDelay(callback_to_invoke, 1);
            }
            else {
                dom._readyList.push(callback_to_invoke);
            }
        }
    };
    domClass.prototype.parse = function (text) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, "text/html");
        return doc;
    };
    domClass.prototype.getElementById = function (id) {
        return doc.getElementById(id);
    };
    domClass.prototype.getElementsByTagName = function (tag_name) {
        var response = [];
        var list = doc.getElementsByTagName(tag_name);
        var count = list.length;
        for (var i = 0; i < count; i++) {
            response.push(list.item(i));
        }
        return response;
    };
    domClass.prototype.getElementsByClassName = function (class_name) {
        var response = [];
        var list = doc.getElementsByClassName(class_name);
        var count = list.length;
        for (var i = 0; i < count; i++) {
            response.push(list.item(i));
        }
        return response;
    };
    domClass.prototype.createElement = function (tag, target) {
        if (tag === void 0) { tag = 'div'; }
        if (target === void 0) { target = 'body'; }
        var parent = null;
        if (target instanceof HTMLElement) {
            parent = target;
        }
        else if (_ly__WEBPACK_IMPORTED_MODULE_3__["default"].lang.isString(target)) {
            parent = doc[target] || doc.getElementsByTagName(target)[0];
        }
        var element = doc.createElement(tag);
        if (!!parent) {
            parent.appendChild(element);
        }
        return element;
    };
    domClass.prototype.injectStyle = function (css, target) {
        if (target === void 0) { target = 'head'; }
        var head = doc[target] || doc.getElementsByTagName(target)[0];
        var style = doc.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        }
        else {
            style.appendChild(doc.createTextNode(css));
        }
        head.appendChild(style);
    };
    domClass.prototype.createAttribute = function (name) {
        return doc.createAttribute(name);
    };
    domClass.prototype.newElement = function (inner_html, append_to_selector) {
        if (inner_html === void 0) { inner_html = ''; }
        var elem;
        if (!!inner_html) {
            var wrapper = doc.createElement("div");
            wrapper.innerHTML = inner_html;
            if (wrapper.childElementCount > 1) {
                elem = wrapper;
            }
            else {
                elem = wrapper.firstChild;
            }
        }
        elem = elem || doc.createElement("div");
        if (!!append_to_selector) {
            var parent_1 = this.get(append_to_selector);
            if (parent_1.length > 0) {
                parent_1[0].appendChild(elem);
            }
        }
        return elem;
    };
    domClass.prototype.getFirst = function (selector, target) {
        if (selector === void 0) { selector = ''; }
        var response = this.get(selector, target);
        return response.length > 0 ? response[0] : undefined;
    };
    domClass.prototype.getLast = function (selector, target) {
        if (selector === void 0) { selector = ''; }
        var response = this.get(selector, target);
        return response.length > 0 ? response[response.length - 1] : undefined;
    };
    domClass.prototype.get = function (selector, target) {
        if (selector === void 0) { selector = ''; }
        if (!!selector) {
            var selector_parser = new SelectorParser(selector);
            if (!!target) {
                return this.getElementFromParent(target, selector_parser);
            }
            else {
                return this.getElementFromDocument(selector_parser);
            }
        }
        return [];
    };
    domClass.prototype.forEachChild = function (elem, func, deep) {
        if (deep === void 0) { deep = false; }
        if (_commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(func) && !!elem && !!elem.children) {
            var count = elem.children.length;
            for (var i = 0; i < count; i++) {
                var child = elem.children.item(i);
                if (!!child) {
                    func(child);
                    if (deep && child.children.length > 0) {
                        // recursive
                        this.forEachChild(child, func, deep);
                    }
                }
            }
        }
    };
    domClass.prototype.map = function (elem, func, deep) {
        if (deep === void 0) { deep = false; }
        var response = new Array();
        if (_commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(func) && !!elem && !!elem.children) {
            var count = elem.children.length;
            for (var i = 0; i < count; i++) {
                var child = elem.children.item(i);
                if (!!child) {
                    if (func(child)) {
                        response.push(child);
                    }
                    if (deep && child.children.length > 0) {
                        // recursive
                        response.push.apply(response, this.map(child, func, deep));
                    }
                }
            }
        }
        return response;
    };
    domClass.prototype.isInput = function (elem) {
        return !!elem
            ? elem.tagName.toLowerCase() === "input"
            : false;
    };
    domClass.prototype.isInputButton = function (elem) {
        return !!elem
            ? this.isInput(elem) && elem.getAttribute("type") === "button"
            : false;
    };
    domClass.prototype.isInputText = function (elem) {
        return !!elem
            ? this.isInput(elem) && elem.getAttribute("type") === "text"
            : false;
    };
    domClass.prototype.isInputCheck = function (elem) {
        return !!elem
            ? this.isInput(elem) && elem.getAttribute("type") === "checkbox"
            : false;
    };
    domClass.prototype.isTextArea = function (elem) {
        return !!elem
            ? elem.tagName.toLowerCase() === "textarea"
            : false;
    };
    domClass.prototype.getValue = function (elem) {
        if (!!elem) {
            if (this.isInput(elem)) {
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
            else if (this.isTextArea(elem)) {
                var e = elem;
                return !!e ? e.value : null;
            }
            else {
                var tag_name = elem.tagName.toLowerCase();
                if (tag_name === "img") {
                    return elem.getAttribute("src");
                }
                else {
                    return elem.innerHTML;
                }
            }
        }
        return null;
    };
    domClass.prototype.setValue = function (elem, value) {
        if (!!elem) {
            if (this.isInput(elem)) {
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
            else if (this.isTextArea(elem)) {
                var e = elem;
                e.value = value;
            }
            else {
                var tag_name = elem.tagName.toLowerCase();
                if (tag_name === "img" && !!value) {
                    elem.setAttribute("src", value);
                }
                else {
                    elem.innerHTML = value;
                }
            }
        }
    };
    domClass.prototype.classAdd = function (elem, class_name) {
        if (!!elem && !!elem.classList) {
            var classes = _commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].toArray(class_name);
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
    domClass.prototype.classRemove = function (elem, class_name) {
        if (!!elem && !!elem.classList) {
            var classes = _commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].toArray(class_name);
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
    domClass.prototype.classHas = function (elem, class_name) {
        if (!!elem && !!elem.classList) {
            var classes = _commons_lang__WEBPACK_IMPORTED_MODULE_2__["default"].toArray(class_name);
            for (var _i = 0, classes_3 = classes; _i < classes_3.length; _i++) {
                var aclass = classes_3[_i];
                if (elem.classList.contains(aclass)) {
                    return true;
                }
            }
        }
        return false;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    domClass.prototype.onDocumentReadyStateChange = function () {
        if (doc.readyState === "complete") {
            this.onDocumentReady();
        }
    };
    domClass.prototype.onDocumentReady = function () {
        this._ready = true;
        this._readyList.forEach(function (callback) {
            _ly__WEBPACK_IMPORTED_MODULE_3__["default"].lang.funcDelay(callback, 1000);
        });
        this._readyList = [];
    };
    domClass.prototype.getElementFromDocument = function (selector) {
        var list = [];
        if (!!selector && _browser__WEBPACK_IMPORTED_MODULE_0__["default"].isReady()) {
            if (selector.type === SelectorType.ID) {
                var result = doc.getElementById(selector.value);
                if (!!result) {
                    list.push(result);
                }
            }
            else if (selector.type === SelectorType.CLASS) {
                var result = doc.getElementsByClassName(selector.value);
                var count = result.length;
                for (var i = 0; i < count; i++) {
                    list.push(result.item(i));
                }
            }
            else if (selector.type === SelectorType.TAG) {
                var result = doc.getElementsByTagName(selector.value);
                var count = result.length;
                for (var i = 0; i < count; i++) {
                    list.push(result.item(i));
                }
            }
            else if (selector.type === SelectorType.ATTR) {
                var children = doc.body.children;
                for (var i = 0; i < children.length; i++) {
                    var elem = children.item(i);
                    var found = this.getElementFromParent(elem, selector);
                    if (found.length > 0) {
                        list.push.apply(list, found);
                    }
                }
            }
        }
        return list;
    };
    domClass.prototype.getElementFromParent = function (elem, selector) {
        var list = new Array();
        if (!!selector && _browser__WEBPACK_IMPORTED_MODULE_0__["default"].isReady()) {
            list.push.apply(list, this.map(elem, function (child) {
                return selector.match(child);
            }, true));
        }
        return list;
    };
    domClass.instance = function () {
        if (null == domClass.__instance) {
            domClass.__instance = new domClass();
        }
        return domClass.__instance;
    };
    return domClass;
}());
var dom = domClass.instance();
/* harmony default export */ __webpack_exports__["default"] = (dom);


/***/ }),

/***/ "./lyts/lyts_core/view/i18n.ts":
/*!*************************************!*\
  !*** ./lyts/lyts_core/view/i18n.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commons/collections/Dictionary */ "./lyts/lyts_core/commons/collections/Dictionary.ts");
/* harmony import */ var _commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../commons/events/EventEmitter */ "./lyts/lyts_core/commons/events/EventEmitter.ts");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./browser */ "./lyts/lyts_core/view/browser.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./lyts/lyts_core/view/dom.ts");
/* harmony import */ var _ly__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ly */ "./lyts/lyts_core/ly.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
 * simple localization:
 * <div data-i18n="caption"></div>
 *
 * attribute localization:
 * <div data-i18n="data-text:caption" data-text=""></div>
 *
 */
var i18n = /** @class */ (function (_super) {
    __extends(i18n, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function i18n() {
        var _this = _super.call(this) || this;
        _this._dictionaries = new _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_0__["Dictionary"]();
        // get lang from browser
        _this._browser_lang = _browser__WEBPACK_IMPORTED_MODULE_2__["default"].lang();
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
        if (this._dictionaries.containsKey(lang)) {
            var dic = this._dictionaries.get(lang);
            dic.putAll(dictionary);
        }
        else {
            var dic = (dictionary instanceof _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_0__["Dictionary"]) ? dictionary : new _commons_collections_Dictionary__WEBPACK_IMPORTED_MODULE_0__["Dictionary"](dictionary);
            this._dictionaries.put(lang, dic);
        }
    };
    i18n.prototype.registerDefault = function (dictionary) {
        this.register(i18n._DEF_LANG, dictionary);
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
    i18n.prototype.localize = function (elem, trace) {
        var _this = this;
        this._localize(elem, !!trace);
        _dom__WEBPACK_IMPORTED_MODULE_3__["default"].forEachChild(elem, function (child) {
            _this._localize(child, !!trace);
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
    i18n.prototype._localize = function (elem, trace) {
        if (!!elem && !!elem.hasAttribute) {
            var data_i18n = elem.getAttribute(i18n._ATTR_DATA_I18N) || '';
            if (!!data_i18n) {
                var tokens = data_i18n.split(":");
                var attr = tokens.length === 2 ? tokens[0] : "";
                var key = tokens.length === 2 ? tokens[1] : data_i18n;
                var value = this.get(key);
                if (trace) {
                    _ly__WEBPACK_IMPORTED_MODULE_4__["default"].console.log("i18n._localize", elem, data_i18n, value);
                }
                if (!!value) {
                    // ly.console.log("i18n._localize", data_i18n, value);
                    // ready to set i18n text or placeholder
                    if (!!attr) {
                        elem.setAttribute(attr, value);
                    }
                    else {
                        if (_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isInput(elem) || _dom__WEBPACK_IMPORTED_MODULE_3__["default"].isTextArea(elem)) {
                            if (_dom__WEBPACK_IMPORTED_MODULE_3__["default"].isInputButton(elem)) {
                                _dom__WEBPACK_IMPORTED_MODULE_3__["default"].setValue(elem, value);
                            }
                            else if (elem.hasAttribute("placeholder")) {
                                elem.setAttribute("placeholder", value);
                            }
                        }
                        else {
                            elem.innerHTML = _ly__WEBPACK_IMPORTED_MODULE_4__["default"].strings.replaceAll("\n", "<br>", value);
                        }
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
}(_commons_events_EventEmitter__WEBPACK_IMPORTED_MODULE_1__["default"]));
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (i18n.instance());


/***/ }),

/***/ "./lyts/lyts_core/view/installer.ts":
/*!******************************************!*\
  !*** ./lyts/lyts_core/view/installer.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commons/console */ "./lyts/lyts_core/commons/console.ts");
/**
 *
 *  MANAGE APP DESKTOP INSTALLATION:
 *  https://developers.google.com/web/fundamentals/app-install-banners/
 *
 *  To install your web app you need a Service Worker
 *  <script>
 *
 *  var cache_files = [...]; // array of paths with files to add to cache (js, css, images, etc..)
 *  // Installing Service Worker
 self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(cache_files);
        })
    );
});

 // Fetching content using Service Worker
 self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
 *  </script>
 *
 */

var installer = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function installer() {
        this._install_status = 9999; // not initialized
        //-- event hooks --//
        if (!!window) {
            window.removeEventListener('beforeinstallprompt', this._on_beforeinstallprompt);
            window.addEventListener('beforeinstallprompt', this._on_beforeinstallprompt);
        }
    }
    Object.defineProperty(installer.prototype, "installed", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._install_status === 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Invoke callback if application manifest is valid for desktop installation.
     */
    installer.prototype.init = function (callback) {
        if (!this._is_ready_callback) {
            this._is_ready_callback = callback;
        }
        if (!!this._install_event) {
            this.doInit();
        }
        return this;
    };
    installer.prototype.prompt = function () {
        try {
            if (!!this._install_event && !!this._install_event.prompt) {
                this._install_event.prompt();
            }
        }
        catch (err) {
            _commons_console__WEBPACK_IMPORTED_MODULE_0__["default"].error('installer.prompt', err);
        }
        return this;
    };
    installer.prototype.finish = function (callback) {
        if (!this._finish_callback) {
            this._finish_callback = callback;
        }
        if (this.prompted) {
            this.doFinish();
        }
        return this;
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    installer.prototype.doInit = function () {
        if (!!this._is_ready_callback) {
            this._is_ready_callback();
            this._is_ready_callback = null; // RESET
        }
    };
    installer.prototype.doFinish = function () {
        if (!!this._finish_callback) {
            this._finish_callback();
            this._finish_callback = null; // RESET
        }
    };
    Object.defineProperty(installer.prototype, "prompted", {
        get: function () {
            return this._install_status != -1 &&
                this._install_status != 9999;
        },
        enumerable: true,
        configurable: true
    });
    installer.prototype._on_beforeinstallprompt = function (install_event) {
        var _this = this;
        // log if manifest allow installation
        _commons_console__WEBPACK_IMPORTED_MODULE_0__["default"].log('installer._on_beforeinstallprompt', 'Found a valid manifest.json for desktop installation.');
        this._install_status = -1;
        // set or update install event
        this._install_event = install_event;
        // wait for the user to respond to the prompt
        this._install_event.userChoice
            .then(function (choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                _commons_console__WEBPACK_IMPORTED_MODULE_0__["default"].log('installer._on_beforeinstallprompt', 'User accepted the A2HS prompt');
                _this._install_status = 1;
            }
            else {
                _commons_console__WEBPACK_IMPORTED_MODULE_0__["default"].log('installer._on_beforeinstallprompt', 'User dismissed the A2HS prompt');
                _this._install_status = 0;
            }
            // reset
            _this._install_event = null;
            _this.doFinish();
        });
        this.doInit();
    };
    installer.instance = function () {
        if (null == installer.__instance) {
            installer.__instance = new installer();
        }
        return installer.__instance;
    };
    return installer;
}());
// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (installer.instance());


/***/ }),

/***/ "./lyts_chrome_extension/application/constants.ts":
/*!********************************************************!*\
  !*** ./lyts_chrome_extension/application/constants.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lyts_lyts_core_commons_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lyts/lyts_core/commons/console */ "./lyts/lyts_core/commons/console.ts");

var IS_LOCALE = true;
// locale endpoint
var HOST_LOCALE = "http://localhost:4199";
// production endpoint
var HOST = "https://your.domain.com:4199";
var constants = {
    app_name: "sample_app",
    uid: "my-sample-app",
    version: "1.0.2",
    LOG_LEVEL: _lyts_lyts_core_commons_console__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].debug,
    // -- host -- //
    host: IS_LOCALE ? HOST_LOCALE : HOST,
    server_namespace: "org_lyts",
    // APP IDENTIFIER
    APP_TOKEN: "iuhdiu87w23ruh897dfyc2w3r",
    // BUS EVENTS
    ONBUS_USER_ON: "onbus_user_on",
    ONBUS_USER_OFF: "onbus_user_off",
    ONBUS_USER_IMAGE: "onbus_user_image",
    ONBUS_NETWORK_ON: "onbus_network_on",
    ONBUS_NETWORK_OFF: "onbus_network_off",
    // IMG
    IMAGE_USER: "build/assets/images/user.png",
    // STYLE CLASSES
    CLASS_HIDDEN: "hidden",
};
/* harmony default export */ __webpack_exports__["default"] = (constants);


/***/ }),

/***/ "./lyts_chrome_extension/application/controller/chrome/Action.ts":
/*!***********************************************************************!*\
  !*** ./lyts_chrome_extension/application/controller/chrome/Action.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lyts/lyts_core/commons/BaseObject */ "./lyts/lyts_core/commons/BaseObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Extension type helper;
 *
 * chrome.browserAction
 * chrome.pageAction
 */
var Action = /** @class */ (function (_super) {
    __extends(Action, _super);
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Action() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Object.defineProperty(Action.prototype, "type", {
        // ------------------------------------------------------------------------
        //                      p u b l i c
        // ------------------------------------------------------------------------
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    Action.prototype.addListener = function (callback) {
        if (this.type === "browserAction") {
            chrome.browserAction.onClicked.addListener(callback);
        }
        else if (this.type === "pageAction") {
            chrome.pageAction.onClicked.addListener(callback);
        }
    };
    Action.prototype.removeListener = function (callback) {
        if (this.type === "browserAction") {
            chrome.browserAction.onClicked.removeListener(callback);
        }
        else if (this.type === "pageAction") {
            chrome.pageAction.onClicked.removeListener(callback);
        }
    };
    Action.prototype.enable = function (tab_id) {
        if (this.type === "browserAction") {
            chrome.browserAction.enable(tab_id);
        }
        else if (this.type === "pageAction") {
            chrome.pageAction.show(tab_id);
        }
    };
    Action.prototype.disable = function (tab_id) {
        if (this.type === "browserAction") {
            chrome.browserAction.disable(tab_id);
        }
        else if (this.type === "pageAction") {
            chrome.pageAction.hide(tab_id);
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Action.prototype.init = function () {
        if (!!chrome.pageAction) {
            this._type = "pageAction";
        }
        if (!!chrome.browserAction) {
            this._type = "browserAction";
        }
    };
    Action.instance = function () {
        if (null == Action.__instance) {
            Action.__instance = new Action();
        }
        return Action.__instance;
    };
    return Action;
}(_lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_0__["default"]));
// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (Action.instance());


/***/ }),

/***/ "./lyts_chrome_extension/application/controller/chrome/Runtime.ts":
/*!************************************************************************!*\
  !*** ./lyts_chrome_extension/application/controller/chrome/Runtime.ts ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lyts/lyts_core/commons/BaseObject */ "./lyts/lyts_core/commons/BaseObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * chrome.runtime helper
 */
var Runtime = /** @class */ (function (_super) {
    __extends(Runtime, _super);
    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Runtime() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    Runtime.prototype.sendMessage = function (message, responseCallback) {
        chrome.runtime.sendMessage(message, responseCallback);
    };
    Runtime.prototype.addListener = function (callback) {
        chrome.runtime.onMessage.addListener(callback);
    };
    Runtime.prototype.removeListener = function (callback) {
        chrome.runtime.onMessage.removeListener(callback);
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Runtime.prototype.init = function () {
    };
    Runtime.instance = function () {
        if (null == Runtime.__instance) {
            Runtime.__instance = new Runtime();
        }
        return Runtime.__instance;
    };
    return Runtime;
}(_lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_0__["default"]));
// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (Runtime.instance());


/***/ }),

/***/ "./lyts_chrome_extension/application/controller/chrome/Tabs.ts":
/*!*********************************************************************!*\
  !*** ./lyts_chrome_extension/application/controller/chrome/Tabs.ts ***!
  \*********************************************************************/
/*! exports provided: default, TabEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabEvents", function() { return TabEvents; });
/* harmony import */ var _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lyts/lyts_core/ly */ "./lyts/lyts_core/ly.ts");
/* harmony import */ var _lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lyts/lyts_core/commons/BaseObject */ "./lyts/lyts_core/commons/BaseObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var TabEvents;
(function (TabEvents) {
    TabEvents["onUpdated"] = "on_updated";
    TabEvents["onActivated"] = "on_activated";
    TabEvents["onRemoved"] = "on_activated";
})(TabEvents || (TabEvents = {}));
/**
 * chrome.tabs Helper
 */
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function Tabs() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Tabs.prototype.init = function () {
    };
    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------
    /**
     * Return current active tab.
     * @param callback
     */
    Tabs.getActive = function (callback) {
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                try {
                    if (!!tabs && tabs.length > 0) {
                        var tab = tabs[0];
                        if (!!tab && tab.id != undefined) {
                            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, null, tab);
                        }
                        else {
                            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, "Invalid tab: Tab has not a valid id", null);
                        }
                    }
                    else {
                        _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, null, null);
                    }
                }
                catch (err) {
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, err, null);
                }
            });
        }
        catch (err) {
            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, err, null);
        }
    };
    Tabs.executeScript = function (raw_tab_id, details, callback) {
        try {
            Tabs.validateTabId(raw_tab_id, function (tab_id) {
                if (tab_id > -1) {
                    chrome.tabs.executeScript(tab_id, details, function (response) {
                        if (!!chrome.runtime.lastError) {
                            var err = chrome.runtime.lastError.message || "";
                            if (!!err) {
                                _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, err, response);
                            }
                            else {
                                _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, false, response);
                            }
                        }
                        else {
                            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, false, response);
                        }
                    });
                }
                else {
                    // invalid tab index
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, "Unable to process the script", null);
                }
            });
        }
        catch (err) {
            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, err, null);
        }
    };
    Tabs.addListener = function (event, callback) {
        if (event === TabEvents.onUpdated) {
            chrome.tabs.onUpdated.addListener(callback);
        }
        else if (event == TabEvents.onActivated) {
            chrome.tabs.onActivated.addListener(callback);
        }
        else if (event == TabEvents.onRemoved) {
            chrome.tabs.onRemoved.addListener(callback);
        }
    };
    Tabs.removeListener = function (event, callback) {
        if (event === TabEvents.onUpdated) {
            chrome.tabs.onUpdated.removeListener(callback); // (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void
        }
        else if (event == TabEvents.onActivated) {
            chrome.tabs.onActivated.removeListener(callback); // (activeInfo: TabActiveInfo) => void
        }
        else if (event == TabEvents.onRemoved) {
            chrome.tabs.onRemoved.removeListener(callback); // (tabId: number, removeInfo: TabRemoveInfo) => void
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    Tabs.validateTabId = function (tab_id, callback) {
        if (null !== tab_id) {
            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, tab_id);
        }
        else {
            Tabs.getActive(function (err, tab) {
                if (!!err) {
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.error("Tabs.validateTabId", err);
                }
                if (!!tab && !!tab.id) {
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, tab.id);
                }
                else {
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcInvoke(callback, -1);
                }
            });
        }
    };
    return Tabs;
}(_lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_1__["default"]));
// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (Tabs);



/***/ }),

/***/ "./lyts_chrome_extension/application/model/ModelMessage.ts":
/*!*****************************************************************!*\
  !*** ./lyts_chrome_extension/application/model/ModelMessage.ts ***!
  \*****************************************************************/
/*! exports provided: default, ActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionType", function() { return ActionType; });
/* harmony import */ var _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lyts/lyts_core/ly */ "./lyts/lyts_core/ly.ts");

/**
 * Extend adding new types for more messaging options....
 */
var ActionType;
(function (ActionType) {
    ActionType["none"] = "none";
    ActionType["showPageAction"] = "showPageAction";
    ActionType["execute"] = "execute";
    ActionType["response"] = "response";
})(ActionType || (ActionType = {}));
/**
 * The Message class
 */
var ModelMessage = /** @class */ (function () {
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function ModelMessage() {
        this.action = ActionType.none;
        this.parameters = false;
    }
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      F A C T O R Y
    // ------------------------------------------------------------------------
    ModelMessage.create = function (params) {
        var response = new ModelMessage();
        if (!!params) {
            for (var key in params) {
                if (params.hasOwnProperty(key) && response.hasOwnProperty(key)) {
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.set(response, key, params[key]);
                }
            }
        }
        return response;
    };
    return ModelMessage;
}());
// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------
/* harmony default export */ __webpack_exports__["default"] = (ModelMessage);



/***/ }),

/***/ "./lyts_chrome_extension/background.ts":
/*!*********************************************!*\
  !*** ./lyts_chrome_extension/background.ts ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lyts/lyts_core/ly */ "./lyts/lyts_core/ly.ts");
/* harmony import */ var _lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lyts/lyts_core/commons/BaseObject */ "./lyts/lyts_core/commons/BaseObject.ts");
/* harmony import */ var _application_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./application/constants */ "./lyts_chrome_extension/application/constants.ts");
/* harmony import */ var _application_controller_chrome_Tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./application/controller/chrome/Tabs */ "./lyts_chrome_extension/application/controller/chrome/Tabs.ts");
/* harmony import */ var _application_model_ModelMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./application/model/ModelMessage */ "./lyts_chrome_extension/application/model/ModelMessage.ts");
/* harmony import */ var _application_controller_chrome_Runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./application/controller/chrome/Runtime */ "./lyts_chrome_extension/application/controller/chrome/Runtime.ts");
/* harmony import */ var _application_controller_chrome_Action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./application/controller/chrome/Action */ "./lyts_chrome_extension/application/controller/chrome/Action.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







/**
 * background script starts immediately when extension is installed or when browser is opened
 */
var background = /** @class */ (function (_super) {
    __extends(background, _super);
    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------
    function background() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------
    background.prototype.start = function () {
        // background starts immediately when browser is opened
        // ly.console.log("background.start", "starting background at: " + new Date());
        // message: any, sender: MessageSender, sendResponse: (response: any) => void
        _application_controller_chrome_Runtime__WEBPACK_IMPORTED_MODULE_5__["default"].addListener(this.onMessage);
        _application_controller_chrome_Tabs__WEBPACK_IMPORTED_MODULE_3__["default"].addListener(_application_controller_chrome_Tabs__WEBPACK_IMPORTED_MODULE_3__["TabEvents"].onUpdated, this.onTabUpdated);
    };
    /**
     * This method is expected from ConversaCon controller to remove running app
     */
    background.prototype.remove = function () {
        try {
            // remove local listeners, too
            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].Application.events.off(this);
        }
        catch (err) {
            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.error("launcher.remove()", err);
        }
    };
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    background.prototype.init = function () {
        // init application scope
        _lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_1__["default"].PREFIX = _application_constants__WEBPACK_IMPORTED_MODULE_2__["default"].uid + "_"; // application uid become component prefix.
        _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.uid = _application_constants__WEBPACK_IMPORTED_MODULE_2__["default"].uid + "-" + _application_constants__WEBPACK_IMPORTED_MODULE_2__["default"].version;
        _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.level = _application_constants__WEBPACK_IMPORTED_MODULE_2__["default"].LOG_LEVEL;
        // local i18n
        _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].Application.events.on(this, _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].i18n.EVENT_CHANGE_LANG, this.onLocalChangeLang);
    };
    background.prototype.onMessage = function (raw_message, sender, sendResponse) {
        _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.debug("background.onMessage", "received at: " + new Date(), raw_message);
        var message = _application_model_ModelMessage__WEBPACK_IMPORTED_MODULE_4__["default"].create(raw_message);
        if (!!message) {
            if (message.action == _application_model_ModelMessage__WEBPACK_IMPORTED_MODULE_4__["ActionType"].showPageAction) {
                // MESSAGE TO ENABLE EXTENSION IN CURRENT TAB
                _application_controller_chrome_Tabs__WEBPACK_IMPORTED_MODULE_3__["default"].getActive(function (err, tab) {
                    if (!!tab && tab.id !== undefined) {
                        _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.debug("background.onMessage#tabs.query", tab);
                        _application_controller_chrome_Action__WEBPACK_IMPORTED_MODULE_6__["default"].enable(tab.id);
                    }
                });
            }
            else if (message.action == _application_model_ModelMessage__WEBPACK_IMPORTED_MODULE_4__["ActionType"].execute && !!message.parameters) {
                // RECEIVED A MESSAGE TO INJECT A SCRIPT
                var script = _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.get(message.parameters, "script");
                var file = _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.get(message.parameters, "file");
                var tab_id = _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.get(message.parameters, "tab_id");
                var details = {};
                if (!!script) {
                    details.script = script;
                }
                else if (!!file) {
                    details.file = file;
                }
                _application_controller_chrome_Tabs__WEBPACK_IMPORTED_MODULE_3__["default"].executeScript(tab_id, details, function (err, response) {
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.debug("background.onMessage#ActionType.execute", response);
                });
            }
            else if (message.action == _application_model_ModelMessage__WEBPACK_IMPORTED_MODULE_4__["ActionType"].response && !!message.parameters) {
                // RECEIVED A MESSAGE WITH A RESPONSE
                var script = _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.get(message.parameters, "script");
                var response = _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].objects.get(message.parameters, "response");
                if (!!script && response != undefined) {
                    _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.debug("background.onMessage#ActionType.response", script, response);
                }
            }
        }
    };
    background.prototype.onTabUpdated = function (tabId, changeInfo, tab) {
        if (!!changeInfo && changeInfo.status === "complete") {
            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].console.debug("background.onTabUpdated", tabId, changeInfo, tab);
            _lyts_lyts_core_ly__WEBPACK_IMPORTED_MODULE_0__["default"].lang.funcDelay(function () {
                _application_controller_chrome_Tabs__WEBPACK_IMPORTED_MODULE_3__["default"].executeScript(tabId, { file: "app/inject/get_content.js" }, function (err, response) {
                });
            }, 1000);
        }
    };
    background.prototype.onLocalChangeLang = function (lang) {
    };
    background.instance = function () {
        if (null == background.__instance) {
            background.__instance = new background();
        }
        return background.__instance;
    };
    return background;
}(_lyts_lyts_core_commons_BaseObject__WEBPACK_IMPORTED_MODULE_1__["default"]));
// ------------------------------------------------------------------------
//                      S T A R T   A P P L I C A T I O N
// ------------------------------------------------------------------------
background.instance().start();


/***/ })

/******/ });
//# sourceMappingURL=background.js.map