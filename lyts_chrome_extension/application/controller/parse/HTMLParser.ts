import BaseObject from "../../../../lyts/lyts_core/commons/BaseObject";
import globals from "../../globals";
import UrlParser from "../../../../lyts/lyts_core/view/UrlParser";


interface HTMLLink {
    href: string,
    text: Array<string> | string
}

class HTMLParser
    extends BaseObject {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private _enabled: boolean;
    private _html: string;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    private constructor(html: string) {
        super();

        this._enabled = !!globals.$;
        this._html = html;
    }

    // ------------------------------------------------------------------------
    //                      p r o p e r t i e s
    // ------------------------------------------------------------------------

    public get enabled(): boolean {
        return this._enabled;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public links(domain?: string, only_textual_links?: boolean): Array<HTMLLink> {
        const response: Array<HTMLLink> = new Array<HTMLLink>();
        const links: Array<string> = new Array<string>();
        if (this._enabled) {
            const $: any = globals.$;
            const $html: any = $(this._html);
            $html.find("a").each((index: number, elem: Element) => {

                const href: string = !!elem ? elem.getAttribute("href") || "" : "";
                if (!!href && href !== "#") {
                    const matched: UrlParser | null = this.match(href, domain);
                    if (!!matched) {
                        if (links.indexOf(matched.href) === -1) {
                            // get text for child nodes
                            const text: Array<string> = new Array<string>();
                            $(elem).text((index: number, txt: string) => {
                                if (!!txt) {
                                    text.push(txt);
                                }
                                return txt;
                            });
                            if (!!only_textual_links) {
                                if (text.length > 0) {
                                    response.push({
                                        href: matched.href,
                                        text: text
                                    });
                                }
                            } else {
                                response.push({
                                    href: matched.href,
                                    text: text
                                });
                            }
                            // add to check array
                            links.push(matched.href);
                        }
                    }
                }

            });
        }
        return response;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private match(url: string, domain?: string): UrlParser | null {
        if (!!url) {
            const original_url: UrlParser = new UrlParser(url);
            if (!!domain) {
                const domain_url: UrlParser = new UrlParser(domain);
                if (!!original_url.pathname
                    && original_url.pathname !== "/"
                    && original_url.sameOrigin(domain_url)) {
                    return original_url;
                } else {
                    return null;
                }
            }
            return original_url;
        }
        return null;
    }

    // ------------------------------------------------------------------------
    //                      F A C T O R Y
    // ------------------------------------------------------------------------

    public static create(html: string): HTMLParser {
        return new HTMLParser(html);
    }

}

// ------------------------------------------------------------------------
//                      E X P O R T
// ------------------------------------------------------------------------

export default HTMLParser;
export {HTMLLink}
