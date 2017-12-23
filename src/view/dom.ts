import browser from "./browser";

import strings from "../commons/strings";
import lang from "../commons/lang";


export enum SelectorType { ID, CLASS, TAG, ATTR }

/**
 * Parser for CSS selectors.
 */
export class SelectorParser {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _selector: string;

    private _type: SelectorType;
    private _name: string;   // attribute name
    private _value: string;  // attribute value
    private _operator: string; // check operator

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(selector: string) {
        this._selector = selector;

        this.parse();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public get raw(): string {
        return this._selector;
    }

    public get type(): SelectorType {
        return this._type;
    }

    public get name(): string {
        return this._name;
    }

    public get value(): string {
        return this._value;
    }

    public get operator(): string {
        return this._operator;
    }

    public match(elem: HTMLElement): boolean {
        try {
            if (!!elem) {
                return this.matchElement(elem);
            }
        } catch (err) {
        }
        return false;
    }

    private matchElement(elem: Element): boolean {
        if (this.type === SelectorType.TAG) {
            return elem.tagName === this.value;
        } else if (this.type === SelectorType.ID) {
            return elem.id == this.value;
        } else if (this.type === SelectorType.CLASS) {
            let classes: string[] = elem.className.split(" ") || [];
            return classes.indexOf(this.value) > -1;
        } else if (this.type === SelectorType.ATTR) {
            if (!!this.operator) {
                if (elem.hasAttribute(this.name)) {
                    const attr_value = elem.getAttribute(this.name) || '';
                    if (this.operator === "=") {
                        return attr_value === this.value;
                    } else if (this.operator === "~=") {
                        // attribute value is a whitespace-separated list of words, one of which is exactly "val" (attribute="val1 val2")
                        return attr_value.split(" ").indexOf(this.value) > -1;
                    } else if (this.operator === "|=") {
                        // attribute value equals "val" or starts with
                        return strings.startWith(attr_value, this.value);
                    }
                }
            } else {
                // check only attribute
                return elem.hasAttribute(this.value);
            }
        }

        return false;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private parse() {
        if (!!this._selector) {
            // defaults
            this._operator = '';

            // check type and parse values
            if (SelectorParser.isSelectorID(this._selector)) {
                // selector id
                this._type = SelectorType.ID;
                this._name = "id";
                this._value = this._selector.substring(1);
            } else if (SelectorParser.isSelectorCLASS(this._selector)) {
                // selector class
                this._type = SelectorType.CLASS;
                this._name = "class";
                this._value = this._selector.substring(1);
            } else if (SelectorParser.isSelectorATTR(this._selector)) {
                // selector attribute [attribute]='value'
                this._type = SelectorType.ATTR;
                const selector = strings.replaceAll(["'", "[", "]"], "", this._selector);
                // [att=val] [att~=val] [att|=val]
                if (selector.indexOf("~=") > -1) {
                    // [att~=val] - Represents an element with the att attribute whose value is a whitespace-separated list of words, one of which is exactly "val"
                    const tokens: string[] = selector.split("~=");
                    this._name = tokens[0];
                    this._value = tokens[1];
                    this._operator = '~=';
                } else if (selector.indexOf("|=") > -1) {
                    // [att|=val] - Represents an element with the att attribute, its value either being exactly "val" or beginning with "val" immediately followed by "-" (U+002D).
                    const tokens: string[] = selector.split("|=");
                    this._name = tokens[0];
                    this._value = tokens[1];
                    this._operator = '|=';
                } else if (selector.indexOf("=") > -1) {
                    // [att=val]
                    const tokens: string[] = selector.split("=");
                    this._name = tokens[0];
                    this._value = tokens[1];
                    this._operator = '=';
                } else {
                    // [attr]
                    this._name = selector;
                    this._value = selector;
                    this._operator = '';
                }
            } else {
                // selector tag name
                this._type = SelectorType.TAG;
                this._name = this._selector;
                this._value = this._selector;
            }
        }
    }

    private static isSelectorID(selector: string): boolean {
        return !!selector ? strings.startWith(selector, "#") : false;
    }

    private static isSelectorCLASS(selector: string): boolean {
        return !!selector ? strings.startWith(selector, ".") : false;
    }

    private static isSelectorATTR(selector: string): boolean {
        return !!selector ? strings.startWith(selector, "[") && selector.indexOf("]") > -1 : false;
    }


}

/**
 * Default Export class.
 */
export default class dom {

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public static parse(text: string): Node {
        let parser: DOMParser = new DOMParser();
        let doc: HTMLDocument = parser.parseFromString(text, "text/html");
        return doc;
    }

    public static newElement(inner_html: string = '', append_to_selector?: string): HTMLElement {
        let elem;
        if (!!inner_html) {
            let wrapper = document.createElement("div");
            wrapper.innerHTML = inner_html;
            if (wrapper.childElementCount > 1) {
                elem = wrapper;
            } else {
                elem = wrapper.firstChild as HTMLElement;
            }
        }

        elem = elem || document.createElement("div");

        if (!!append_to_selector) {
            const parent: Array<HTMLElement> = dom.get(append_to_selector);
            if (parent.length > 0) {
                parent[0].appendChild(elem);
            }
        }

        return elem;
    }

    public static getFirst(selector: string = '', target?: HTMLElement): HTMLElement | null {
        const response: Array<HTMLElement> = dom.get(selector, target);
        return response.length > 0 ? response[0] : null;
    }

    public static getLast(selector: string = '', target?: HTMLElement): HTMLElement | null {
        const response: Array<HTMLElement> = dom.get(selector, target);
        return response.length > 0 ? response[response.length - 1] : null;
    }

    public static get(selector: string = '', target?: HTMLElement): Array<HTMLElement> {
        if (!!selector) {
            const selector_parser: SelectorParser = new SelectorParser(selector);
            if (!!target) {
                return dom.getElementFromParent(target, selector_parser);
            } else {
                return dom.getElementFromDocument(selector_parser);
            }
        }
        return [];
    }

    public static forEachChild(elem: HTMLElement, func: (child: HTMLElement) => void, deep: boolean = false): void {
        if (lang.isFunction(func) && !!elem && !!elem.children) {
            const count = elem.children.length;
            for (let i = 0; i < count; i++) {
                const child: HTMLElement = elem.children.item(i) as HTMLElement;
                if (!!child) {
                    func(child);
                    if (deep && child.children.length > 0) {
                        // recursive
                        dom.forEachChild(child, func, deep);
                    }
                }
            }
        }
    }

    public static map(elem: HTMLElement, func: (child: HTMLElement) => boolean, deep: boolean = false): HTMLElement[] {
        const response = new Array<HTMLElement>();
        if (lang.isFunction(func) && !!elem) {
            const count = elem.children.length;
            for (let i = 0; i < count; i++) {
                const child: HTMLElement = elem.children.item(i) as HTMLElement;
                if (!!child) {
                    if (func(child)) {
                        response.push(child);
                    }
                    if (deep && child.children.length > 0) {
                        // recursive
                        response.push(...dom.map(child, func, deep));
                    }
                }
            }
        }
        return response;
    }

    public static isInput(elem: Element | null) {
        return !!elem
            ? elem.tagName.toLowerCase() === "input"
            : false;
    }

    public static isInputButton(elem: Element | null) {
        return !!elem
            ? dom.isInput(elem) && elem.getAttribute("type") === "button"
            : false;
    }

    public static isInputText(elem: HTMLElement | null) {
        return !!elem
            ? dom.isInput(elem) && elem.getAttribute("type") === "text"
            : false;
    }

    public static isInputCheck(elem: HTMLElement | null) {
        return !!elem
            ? dom.isInput(elem) && elem.getAttribute("type") === "checkbox"
            : false;
    }

    public static isTextArea(elem: Element | null) {
        return !!elem
            ? elem.tagName.toLowerCase() === "textarea"
            : false;
    }

    public static getValue(elem: HTMLElement | null): any {
        if (!!elem) {
            if (dom.isInput(elem)) {
                const e = elem as HTMLInputElement;
                if (!!e) {
                    const type = e.getAttribute("type");
                    if (type === "checkbox") {
                        return e.checked;
                    } else if (!!e.value) {
                        return e.value;
                    }
                }
            } else if (dom.isTextArea(elem)) {
                const e = elem as HTMLTextAreaElement;
                return !!e ? e.value : null;
            }
        }
        return null;
    }

    public static setValue(elem: HTMLElement | null, value: any): void {
        if (!!elem) {
            if (dom.isInput(elem)) {
                const e = elem as HTMLInputElement;
                if (!!e) {
                    const type = e.getAttribute("type");
                    if (type === "checkbox") {
                        e.checked = value;
                    } else {
                        e.value = value;
                    }
                }
            } else if (dom.isTextArea(elem)) {
                const e = elem as HTMLTextAreaElement;
                e.value = value;
            } else {
                elem.innerHTML = value;
            }
        }
    }

    public static classAdd(elem: HTMLElement | null, class_name: string | string[]): boolean {
        if (!!elem && !!elem.classList) {
            let classes: string[] = lang.toArray<string>(class_name);
            for (let aclass of classes) {
                if (!elem.classList.contains(aclass)) {
                    elem.classList.add(aclass)
                }
            }
            return true;
        }
        return false;
    }

    public static classRemove(elem: HTMLElement | null, class_name: string | string[]): boolean {
        if (!!elem && !!elem.classList) {
            let classes: string[] = lang.toArray<string>(class_name);
            for (let aclass of classes) {
                if (elem.classList.contains(aclass)) {
                    elem.classList.remove(aclass)
                }
            }
            return true;
        }
        return false;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private static getElementFromDocument(selector: SelectorParser): Array<HTMLElement> {
        const list = [];
        if (!!selector && browser.isReady()) {
            if (selector.type === SelectorType.ID) {
                const result: any = document.getElementById(selector.value);
                if (!!result) {
                    list.push(result);
                }
            } else if (selector.type === SelectorType.CLASS) {
                const result: HTMLCollectionOf<Element> = document.getElementsByClassName(selector.value);
                const count = result.length;
                for (let i = 0; i < count; i++) {
                    list.push(result.item(i));
                }
            } else if (selector.type === SelectorType.TAG) {
                const result: NodeListOf<Element> = document.getElementsByTagName(selector.value);
                const count = result.length;
                for (let i = 0; i < count; i++) {
                    list.push(result.item(i));
                }
            } else if (selector.type === SelectorType.ATTR) {
                const children: HTMLCollection = document.body.children;
                for (let i = 0; i < children.length; i++) {
                    const elem: HTMLElement = children.item(i) as HTMLElement;
                    const found: Array<HTMLElement> = dom.getElementFromParent(elem, selector);
                    if (found.length > 0) {
                        list.push(...found);
                    }
                }
            }
        }

        return list;
    }

    private static getElementFromParent(elem: HTMLElement, selector: SelectorParser): Array<HTMLElement> {
        const list = new Array<HTMLElement>();
        if (!!selector && browser.isReady()) {
            list.push(...dom.map(elem, (child) => {
                return selector.match(child);
            }, true));
        }
        return list;
    }


}