import ly from "../../ly";
import {Dictionary} from "../../commons/collections/Dictionary";
import ElementWrapper from "../components/ElementWrapper";
import Component from "../components/Component";


const ATTR_DATA_FIELD: string = "data-field";
const ON_FOCUSOUT: string = "focusout";

/**
 * Bind a data model to dom.
 * Works from DOM to data.
 *
 */
class DataBinding {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _owner: Component;
    private _entity: any;
    private _registry: Dictionary<ElementWrapper>;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public constructor(owner: Component) {
        this._owner = owner;
        this._entity = false;
        this._registry = new Dictionary<ElementWrapper>();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public set entity(value: any) {
        this._entity = value;
    }

    public get entity(): any {
        return this._entity;
    }

    public free(): void {
        // ly.console.log("DataBinding.free", this._registry);
        if (!this._registry.isEmpty()) {
            this._registry.values().forEach((item: ElementWrapper, index: number) => {
                item.removeEventListener(ON_FOCUSOUT);
            });
            this._registry.clear();
        }
    }

    public bind(elem: HTMLElement | ElementWrapper): void {
        if (!!this._entity) {
            const root: ElementWrapper = elem instanceof ElementWrapper ? elem : new ElementWrapper(this._owner, elem);
            this._bind(root);
            root.forEachChild((child: ElementWrapper) => {
                this._bind(child);
            }, true);
        } else {
            ly.console.warn("DataBinding.bind", "MIssing 'entity': please set 'entity' before bind HTML.");
        }
    }

    public set(elem: HTMLElement | ElementWrapper, value: any): void {
        if (!!this._entity) {
            const root: ElementWrapper = elem instanceof ElementWrapper ? elem : new ElementWrapper(this._owner, elem);
            const field_name: string = root.getAttribute(ATTR_DATA_FIELD) || "";
            if (!!field_name) {
                // set entity
                ly.objects.set(this._entity, field_name, value);
                // set dom and attach event if any
                this._bind(root);
            }
        } else {
            ly.console.warn("DataBinding.bind", "MIssing 'entity': please set 'entity' before bind HTML.");
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private _bind(elem: ElementWrapper): void {
        if (!!elem && elem.hasAttribute(ATTR_DATA_FIELD)) {
            const field_name: string = elem.getAttribute(ATTR_DATA_FIELD) || '';
            if (!!field_name) {
                const value: string = ly.objects.get(this._entity, field_name);
                elem.value(value);
                // binding event
                this._bindEvent(elem);
            }
        }
    }

    private _bindEvent(elem: ElementWrapper): void {
        const key: string = elem.hash;
        if (!!key && !this._registry.containsKey(key)) {
            this._registry.put(key, elem);
            // event
            elem.addEventListener(ON_FOCUSOUT, this.onChanged);
        }
    }

    private onChanged(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        const elem: HTMLElement = e.srcElement as HTMLElement;
        if (!!elem) {
            const field: string = elem.getAttribute(ATTR_DATA_FIELD) || "";
            const value: string = ly.dom.getValue(elem);
            if (!!field) {
                ly.objects.set(this._entity, field, value);
            }
        }
    }


}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default DataBinding;
