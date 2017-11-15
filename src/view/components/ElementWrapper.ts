import {Listener} from "../../commons/events/Events";
import random from "../../commons/random";
import dom from "../dom";
import Component from "./Component";

/**
 * Wrap a native HTMLElement to expose at Component methods.
 */
class ElementWrapper {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    private static readonly HASH_ATTRIBUTE: string = "__hash__";

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _owner: Component;
    private _element: HTMLElement | null;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(owner: Component, elem: HTMLElement | null) {
        this._owner = owner;
        this._element = elem;

        this._hash_all();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public hasElement(): boolean {
        return !!this._element;
    }

    public appendChild(child: HTMLElement): void {
        if (!!this._element) {
            this._element.appendChild(child);
        }
    }

    public set innerHTML(value: string) {
        if (!!this._element) {
            this._element.innerHTML = value;
        }
    }

    public get innerHTML() {
        if (!!this._element) {
            return this._element.innerHTML;
        }
        return '';
    }

    public addEventListener(event_name: string, listener: Listener): void {
        if (null != this._element && !!this._owner) {
            let hash_code: string = ElementWrapper.hash(this._element);
            if (!!hash_code) {
                let selector: string = "[" + ElementWrapper.HASH_ATTRIBUTE + "=" + hash_code + "]";
                this._owner.addEventListener(selector, event_name, listener);
            }
        } else {
            console.error("ElementWrapper.addEventListener()", "Missing HTML Element or Component Owner.");
        }
    }

    public removeEventListener(event_names?: string | string[]): void {
        if (null != this._element && !!this._owner) {
            let hash_code: string = ElementWrapper.hash(this._element);
            if (!!hash_code) {
                let selector: string = "[" + ElementWrapper.HASH_ATTRIBUTE + "=" + hash_code + "]";
                this._owner.removeEventListener(selector, event_names);
            }
        } else {
            console.error("ElementWrapper.removeEventListener()", "Missing HTML Element or Component Owner.");
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private _hash_all(): void {
        if (null != this._element) {
            // events on root
            ElementWrapper.hash(this._element);
            // events on child
            dom.forEachChild(this._element, (elem: HTMLElement) => {
                ElementWrapper.hash(elem);
            }, true);
        }
    }

    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------

    public static hash(elem: HTMLElement | null): string {
        if (!!elem) {
            if (!elem.hasAttribute(ElementWrapper.HASH_ATTRIBUTE)) {
                let hash_code = random.id();
                elem.setAttribute(ElementWrapper.HASH_ATTRIBUTE, hash_code);
            }
            return elem.getAttribute(ElementWrapper.HASH_ATTRIBUTE) || '';
        }
        return '';
    }

}

export default ElementWrapper;