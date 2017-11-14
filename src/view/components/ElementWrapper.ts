export default class ElementWrapper {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _element: HTMLElement | null;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(elem: HTMLElement | null) {
        this._element = elem;
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

}