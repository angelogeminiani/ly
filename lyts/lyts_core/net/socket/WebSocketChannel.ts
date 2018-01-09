import ly from "../../ly";
import EventEmitter from "../../commons/events/EventEmitter";


const DEF_HOST = 'ws://localhost:8181/websocket';
const DEF_UID = 'mebot_web';

const EVENT_OPEN: string = 'on_open';
const EVENT_CLOSE: string = 'on_close';
const EVENT_MESSAGE: string = 'on_message';
const EVENT_ERROR: string = 'on_error';

class WebSocketChannel
    extends EventEmitter {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _host: string;
    private _ready: boolean;
    private _active: boolean;
    private _web_socket: WebSocket;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    /**
     * Creates a WebSocket wrapper
     * @param params "{host:'ws://localhost:8181/websocket'}"
     */
    constructor(params: any) {
        super();
        this._ready = false;
        this._active = false;
        this._host = params.host || DEF_HOST;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    /**
     * Socket is properly configured
     */
    public get ready(): boolean {
        return this._ready;
    }

    /**
     * Socket is Open
     */
    public get active(): boolean {
        return this._active;
    }

    public get host(): string {
        return this._host;
    }

    public open(): void {
        try {
            this._web_socket = this.createWs();
            if (this.handle(this._web_socket)) {
                this._ready = true;
            } else {
                this._ready = false;
            }
        } catch (err) {
            console.error('WebSocketChannel.open', err);
        }
    }

    public close(): void {
        try {
            if (this._active) {
                this._active = false;
                this._web_socket.close();
            }
        } catch (err) {
            console.error('WebSocketChannel.close', err);
        }
    }

    public send(message: any) {
        try {
            if (this._active
                && this._web_socket.readyState === this._web_socket.OPEN) {
                this._web_socket.send(ly.lang.toString(message));
            }
        } catch (err) {
            console.error('WebSocketChannel.send', err);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private createWs(): WebSocket {
        const WS_native: any = ly.window['WebSocket'] || ly.window['MozWebSocket'];
        return new WS_native();
    }

    private handle(ws: WebSocket): boolean {
        if (!!ws) {
            ws.onmessage = this._on_message;
            ws.onopen = this._on_open;
            ws.onclose = this._on_close;
            ws.onerror = this._on_error;

            return true;
        }
        return false;
    }

    private _on_open(ev: Event): void {
        this._active = true;
        this.emit(EVENT_OPEN);
    }

    private _on_close(ev: CloseEvent): void {
        this._active = false;
        this.emit(EVENT_CLOSE);
    }

    private _on_message(ev: MessageEvent): void {
        const origin: string = ev.origin;
        const ports: any = ev.ports;
        const data: any = ev.data;
        this.emit(EVENT_MESSAGE, ly.lang.parse(data));
    }

    private _on_error(ev: Event): void {
        ev.preventDefault();
        const str_err: string = ly.lang.toString(ev);
        console.error('WebSocketChannel._on_error', str_err);
        this.emit(EVENT_ERROR, str_err);
    }
}

export {WebSocketChannel, EVENT_CLOSE, EVENT_MESSAGE, EVENT_OPEN}