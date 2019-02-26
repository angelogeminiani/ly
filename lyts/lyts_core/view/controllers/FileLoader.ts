import Component from "../components/Component";
import ElementWrapper from "../components/ElementWrapper";
import ly from "../../ly";
import EventEmitter from "../../commons/events/EventEmitter";


const TPL_INPUT: string = '<input id="{{id}}" type="file" accept="{{accept}}" style="display: none">';
const ON_FILES: string = "on_files";

/**
 * Bind a data model to dom.
 * Works from DOM to data.
 *
 */
class FileLoader
    extends EventEmitter {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _accept: string = "";

    private readonly _owner: Component;
    private __input: ElementWrapper;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public constructor(owner: Component) {
        super();
        this._owner = owner;

    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public free(): void {
        if (!!this.__input) {
            this.__input.removeEventListener();
            this.__input.remove();
        }
    }


    public load(): void {
        const native: any = this.input.htmlElement;
        native.click();
    }

    // ------------------------------------------------------------------------
    //                     p r o t e c t e d
    // ------------------------------------------------------------------------

    protected get accept(): string {
        return this._accept;
    }

    protected set accept(value: string) {
        this._accept = value;
    }

    protected loaded(files: FileList): void {
        super.emit(ON_FILES, files);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private get input(): ElementWrapper {
        if (!this.__input) {
            const id: string = this._owner.uid + "___field_imageloader_" + ly.random.id();
            this.__input = new ElementWrapper(this._owner, ly.dom.newElement(ly.format.template(TPL_INPUT, {
                id: id,
                accept: this._accept
            })));
            //this.__input.appendTo(this._owner.element);
            const elem: HTMLElement = ly.dom.getElementsByTagName("body")[0] as HTMLElement;
            this.__input.appendTo(this._owner.element || elem);
            this.__input.addEventListener("change", this.inputChanged.bind(this));
        }
        return this.__input;
    }

    private inputChanged(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        const elem: HTMLInputElement = e.target as HTMLInputElement;
        if (!!elem && !!elem.files) {
            this.loaded(elem.files);
        }
    }


}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default FileLoader;
export {ON_FILES};