import ly from "../ly";

/**
 * Simple url parser
 * var parser = new UrlParser("http://example.com:3000/pathname/?search=test#hash");
 *
 * parser.protocol; // => "http:"
 * parser.host;     // => "example.com:3000"
 * parser.hostname; // => "example.com"
 * parser.port;     // => "3000"
 * parser.pathname; // => "/pathname/"
 * parser.hash;     // => "#hash"
 * parser.search;   // => "?search=test"
 * parser.origin;   // => "http://example.com:3000"
 */
class UrlParser {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _uri: string;

    private __parser: HTMLHyperlinkElementUtils;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(uri: string) {
        this._uri = uri;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public get is_hash(): boolean {
        return this._uri === "#";
    }

    public get is_relative(): boolean {
        return this._uri.indexOf("http") !== 0;
    }

    public get hash(): string {
        return this.parser().hash;
    }

    public get host(): string {
        return this.parser().host;
    }

    public get hostname(): string {
        return this.parser().hostname;
    }

    public get href(): string {
        return this.parser().href;
    }

    public get origin(): string {
        return this.parser().origin;
    }

    public get password(): string {
        return this.parser().password;
    }

    public get pathname(): string {
        return this.parser().pathname;
    }

    public get port(): string {
        return this.parser().port;
    }

    public get protocol(): string {
        return this.parser().protocol;
    }

    public get search(): string {
        return this.parser().search;
    }

    public get username(): string {
        return this.parser().username;
    }

    public sameOrigin(url_param: string | UrlParser): boolean {
        const url: UrlParser = url_param instanceof UrlParser ? url_param as UrlParser : new UrlParser(url_param);
        return url.protocol == this.protocol && url.origin == this.origin;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private parser(): HTMLHyperlinkElementUtils {
        if (!this.__parser) {
            this.__parser = document.createElement("a");
            if (!!this._uri) {
                this.__parser.href = this._uri;
            }
        }

        return this.__parser;
    }


    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------


}

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------

export default UrlParser;