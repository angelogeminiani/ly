import ly from "../../ly";

const ATTR_DATA_FIELD: string = "data-field";
const ON_FOCUSOUT: string = "focusout";


const CSS_FIELDSTYLE: string = "[" + ATTR_DATA_FIELD + "]{border: 2px darkgray dotted; padding: 3px;background-color:#ffffcc;}" +
    "[" + ATTR_DATA_FIELD + "]:hover{ background-color:yellow;}";

interface HtmlTextTemplatingSettings {
    field_style?: string;
    auto_trim?: boolean;
    data_attr?: string;
}

/**
 * Simple template formatter for html.
 *
 * Sample binded tag: <span data-field="name">Mario Rossi</span>
 *
 * // update a view/template
 * update("<span data-field='name'>Mario Rossi</span>", {name:"John Doe"}); // output: <span data-field="name">John Doe</span>
 *
 * // reset a template
 * reset("<span data-field='name'>Mario Rossi</span>"); // output:   "<span data-field='name'>{{name}}</span>"
 *
 * // simply format a template
 * format("<span data-field='name'>{{name}}</span>", {name:"John Doe"}); // output: <span data-field="name">John Doe</span>
 *
 */
class HtmlTextTemplating {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _settings: HtmlTextTemplatingSettings;


    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public constructor(settings?: HtmlTextTemplatingSettings) {

        this._settings = settings || {};

        // add defaults
        this._settings.field_style = this._settings.field_style || CSS_FIELDSTYLE;
        this._settings.auto_trim = this._settings.auto_trim || false;
        this._settings.data_attr = this._settings.data_attr || ATTR_DATA_FIELD;

    }

    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------

    public get settings(): HtmlTextTemplatingSettings {
        return this._settings;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public free(): void {

    }

    public update(source: string, model: any): string {
        source = source.trim();
        const attr: string = this._settings.data_attr || "";
        if (!!attr && this.isHtml(source)) {
            // creates virtual dom
            const elem: HTMLElement = this.buildElement(source);
            // ly.console.log("HtmlTextTemplating.update", elem);
            ly.dom.forEachChild(elem, (child: HTMLElement) => {
                const name: string = child.getAttribute(attr) || "";
                if (!!name) {
                    child.innerHTML = ly.objects.get(model, name) || "";
                }
            }, true);
            return elem.innerHTML;
        }
        return source;
    }

    public reset(source: string): string {
        source = source.trim();
        const attr: string = this._settings.data_attr || "";
        if (!!attr && this.isHtml(source)) {
            // creates virtual dom
            const elem: HTMLElement = this.buildElement(source);
            ly.dom.forEachChild(elem, (child: HTMLElement) => {
                if (child.hasAttribute(attr)) {
                    child.innerText = "{{" + child.getAttribute(attr) || "" + "}}";
                }
            }, true);
            return elem.innerHTML;
        }
        return source;
    }

    /**
     * Simply format template text replacing {{fields}} with data in model.
     * @param source Source HTML textto format with model
     * @param model Data model.
     */
    public format(source: string, model: any): string {
        source = source.trim();
        if (this.isHtml(source)) {
            return ly.format.template(source, model);
        }
        return source;
    }


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private isHtml(source: string): boolean {
        if (!!source) {
            return source.indexOf("<") > -1 && source.indexOf(">") > -1;
        }
        return false;
    }


    private buildElement(html: string): HTMLElement {
        return ly.dom.buildElement("div", html);
    }

}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default HtmlTextTemplating;
export {HtmlTextTemplatingSettings}
