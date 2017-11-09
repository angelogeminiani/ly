import ly from "../../../../src/ly";
import view from "./PageLoginView";
import i18n from "../../../../src/view/i18n";

export default class PageLogin
    extends ly.Component {


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor() {
        super();

        this.init();
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected render(): string {
        return view(this.uid, {test: "hello"});
    }

    protected free() {

    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private init(): void {
        // handle events
        super.addEventListener("[data-id=btn-click]", "click", this.handleClick);
        super.addEventListener("[data-id=btn-click-remove]", "click", this.handleClickRemove);
        super.addEventListener("[data-id=username]", "keydown", () => {
            console.log("change input", super.getValue("[data-id=username]"));
        });
        super.addEventListener("[data-id=check]", "change", () => {
            console.log("change check", super.getValue("[data-id=check]"));
        });
        super.addEventListener("[data-id=tarea]", "change", () => {
            console.log("change tarea", super.getValue("[data-id=tarea]"));
        });

        i18n.on(i18n.EVENT_CHANGE_LANG, ()=>{
            console.log("CHANGE LANG");
            this.localize();
        });
    }

    private handleClick(): void {
        console.log("CLICK");
        console.log("hash", super.hashCode());

        i18n.lang = i18n.lang==="it" ? "en" : "it";
    }

    private handleClickRemove(): void {
        console.log("CLICK REMOVE");
        //super.removeEventListener("[data-id=btn-click]", "click");
        super.remove();
    }

}