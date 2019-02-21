import Component from "../components/Component";
import FileLoader from "./FileLoader";


const ON_IMAGE: string = "on_image";

/**
 * Bind a data model to dom.
 * Works from DOM to data.
 *
 */
class ImageLoader
    extends FileLoader {

    // ------------------------------------------------------------------------
    //                      c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public constructor(owner: Component) {
        super(owner);
        this.accept = "image/*";
    }

    // ------------------------------------------------------------------------
    //                      o v e r r i d e
    // ------------------------------------------------------------------------

    protected loaded(files: FileList): void {
        super.loaded(files);
        for (let i = 0; i < files.length; i++) {
            const file: File | null = files.item(i);
            if (!!file) {
                const last_modified: number = file.lastModified;
                const name: string = file.name;
                const size: number = file.size;
                const reader: FileReader = new FileReader();
                reader.onload = (e: Event) => {
                    const target: any = e.target;
                    if (!!target.result) {
                        const data: string = target.result as string;
                        if (!!data) {
                            this.emit(ON_IMAGE, new ImageFile(name, size, last_modified, data));
                        }
                    }
                };
                // read as base64 url
                reader.readAsDataURL(file);
            }
        }
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public free(): void {
        super.free()
    }


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}

class ImageFile {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private readonly _name: string;
    private readonly _size: number;
    private readonly _last_modified: number;
    private readonly _data: string;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public constructor(name: string, size: number, last_modified: number, data: string) {
        this._name = name;
        this._size = size;
        this._last_modified = last_modified;
        this._data = data;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public get name(): string {
        return this._name;
    }

    public get size(): number {
        return this._size;
    }

    public get lastModified(): number {
        return this._last_modified;
    }

    public get lastModifiedDate(): Date {
        return new Date(this._last_modified);
    }

    public get dataURL(): string {
        return this._data;
    }
}

// ------------------------------------------------------------------------
//                      e x p o r t
// ------------------------------------------------------------------------

export default ImageLoader;
export {ImageFile, ON_IMAGE}