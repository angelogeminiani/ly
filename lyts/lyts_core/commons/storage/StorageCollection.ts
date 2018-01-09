import console from "../console";
import ly from "../../ly";

class StorageCollection {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _name: string;
    private _items: any[];

    private _limit: number;
    private _enabled: boolean;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    constructor(name: string) {
        this._name = name;
        this._items = [];
        this._limit = 0; // no, limits

        this.load();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public get name(): string {
        return this._name;
    }

    public get limit(): number {
        return this._limit;
    }

    public set limit(value: number) {
        this._limit = value;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(value: boolean) {
        this._enabled = value;
    }

    public isEmpty(): boolean {
        return this._items.length === 0;
    }

    public clear(): void {
        this._items = [];
        this.save();
    }

    public push(item: any) {
        if (this.enabled && !!item) {
            this._items.push(item);
            if (this._limit > 0 && this._items.length > this._limit) {
                this._items.shift();
            }
            this.save();
        }
    }

    public forEach(callback: Function): void {
        for (let item of this._items) {
            ly.lang.funcInvoke(callback, item);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private save(): void {
        try {
            localStorage[this.name] = JSON.stringify(this._items);
        } catch (err) {
            console.error('StorageCollection.save', err);
        }
    }

    private load(): void {
        try {
            const items: any[] = JSON.parse(localStorage[this.name] || '[]') as Array<any>;
            this._items.push(...items);
        } catch (err) {
            console.error('StorageCollection.load', err);
        }
    }

}

export default StorageCollection;