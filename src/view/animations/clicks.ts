import ElementWrapper from "../components/ElementWrapper";
import {Listener} from "../../commons/events/Events";
import lang from "../../commons/lang";

export namespace animations {

    const FLAT_CLICK: string = "--btn-click";

    export class clicks {

        /**
         * Animate a FLAT BUTTON component
         * @param {ElementWrapper} elem Wrapper to button
         * @param {Listener} callback Listener
         */
        public static flatButton(elem: ElementWrapper, callback: Listener): void {
            elem.addEventListener("click", (e: Event) => {
                e.preventDefault();
                elem.classAdd(FLAT_CLICK);
            });
            elem.addEventListener("animationend", (e: Event) => {
                e.preventDefault();
                elem.classRemove(FLAT_CLICK);
                lang.funcInvoke(callback);
            });
        }

    }

}