import ly from "../../ly";
import EventEmitter from "../../commons/events/EventEmitter";
import console from "../../commons/console";


const DEF_HOST = 'ws://localhost:8181/websocket';
const DEF_UID = 'mebot_web';

const EVENT_OPEN: string = 'on_open';
const EVENT_CLOSE: string = 'on_close';
const EVENT_MESSAGE: string = 'on_message';
const EVENT_ERROR: string = 'on_error';

const FLD_REQUEST_UUID = "request_uuid";
const FLD_REQUEST_UUID_HANDLED = "request_uuid_handled";
const FLD_REQUEST_UUID_TIMEOUT = 10*1000; // 10 seconds timeout

class WebSocketChannel
    extends EventEmitter {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _host: string;
    private _initialized: boolean;
    private _active: boolean;
    private _web_socket: WebSocket | null;
    private _callback_pool: any;
    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    /**
     * Creates a WebSocket wrapper
     * @param params "{host:'ws://localhost:8181/websocket'}"
     */
    constructor(params: any) {
        super();
        this._initialized = false;
        this._active = false;
        this._host = params.host || DEF_HOST;
        this._callback_pool = {}; // contains registered callbacks
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    /**
     * Use this to pass a callback and enable message send when
     * socket is ready to send.
     */
    public ready(callback: Function): void {
        if (this._initialized) {
            if (this._active) {
                ly.lang.funcInvoke(callback, true);
            } else {
                this.on(this, EVENT_OPEN, () => {
                    this.off(this);
                    ly.lang.funcInvoke(callback, true);
                });
            }
        } else {
            // exit not ready
            ly.lang.funcInvoke(callback, false);
        }
    }

    public reset(): void {
        this._callback_pool = {};
        this.close();
        this.open();
    }

    /**
     * Socket is properly configured
     */
    public get initialized(): boolean {
        return this._initialized;
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
                this._initialized = true;
            } else {
                this._initialized = false;
            }
        } catch (err) {
            console.error('WebSocketChannel.open', err);
        }
    }

    public close(): void {
        try {
            if (this._active) {
                this._initialized = false;
                this._active = false;
                if (!!this._web_socket) {
                    this._web_socket.close();
                    this.free();
                }
            }
        } catch (err) {
            console.error('WebSocketChannel.close', err);
        }
    }

    public send(message: any, callback?: any) {
        try {
            if (this._active
                && !!this._web_socket
                && this._web_socket.readyState === this._web_socket.OPEN) {

                if (!!callback) {
                    const callback_uuid: string = ly.random.guid();
                    message[FLD_REQUEST_UUID] = callback_uuid;
                    this._callback_pool[callback_uuid] = callback;
                    // set timeout
                    ly.lang.funcDelay(()=>{
                        delete this._callback_pool[callback_uuid];
                        console.debug("WebSocketChannel.send", "timeout removed " + callback_uuid);
                    }, FLD_REQUEST_UUID_TIMEOUT);
                }
                // ready to send
                this._web_socket.send(ly.lang.toString(message));
            } else {
                console.warn('WebSocketChannel.send',
                    'Socket is not ready to send message.',
                    this._web_socket, message);
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
        return new WS_native(this._host);
    }

    private free(): void {
        if (!!this._web_socket) {
            this._web_socket = null;
        }
    }

    private handle(ws: WebSocket): boolean {
        if (!!ws) {
            ws.onmessage = this._on_message.bind(this);
            ws.onopen = this._on_open.bind(this);
            ws.onclose = this._on_close.bind(this);
            ws.onerror = this._on_error.bind(this);

            return true;
        } else {
            console.warn('WebSocketChannel.handle', 'WebSocket not found', ws);
            return false;
        }
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
        try {
            const origin: string = ev.origin;
            const ports: any = ev.ports;
            const data: any = ly.lang.parse(ev.data);
            if (!!data[FLD_REQUEST_UUID]) {
                const callback_uuid: string = data[FLD_REQUEST_UUID];
                if (!!this._callback_pool[callback_uuid]) {
                    const f: any = this._callback_pool[callback_uuid];
                    if (ly.lang.isFunction(f)) {
                        f(data);
                    }
                }
                // remove
                delete this._callback_pool[callback_uuid];
                data[FLD_REQUEST_UUID_HANDLED] = true;
            }
            this.emit(EVENT_MESSAGE, data);
        } catch (err) {
            console.error("WebSocketChannel._on_message", err);
        }
    }

    private _on_error(ev: Event): void {
        ev.preventDefault();
        const str_err: string = ly.lang.toString(ev);
        console.error('WebSocketChannel._on_error', str_err);
        this.emit(EVENT_ERROR, str_err);
    }
}

export {WebSocketChannel, EVENT_CLOSE, EVENT_MESSAGE, EVENT_OPEN}