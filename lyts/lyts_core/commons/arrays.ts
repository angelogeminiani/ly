import ly from "../ly";

export default class arrays {

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    static equals(array1: Array<any>, array2: Array<any>): boolean {
        let response: boolean = true;
        try {
            if (!!array1 && !!array2 && array1.length === array2.length) {
                for (let i = 0; i < array1.length; i++) {
                    const val1: any = array1[i];
                    const val2: any = array2[i];
                    if (ly.lang.isArray(val1) && ly.lang.isArray(val2)) {
                        response = arrays.equals(val1, val2);
                    } else {
                        response = (val1 === val2);
                    }
                    if (!response) {
                        break;
                    }
                }
            } else {
                response = false;
            }
        } catch (ignored) {
            // ignored
            response = false;
        }
        return response;
    }

    static push(array: Array<any>, ...items: any[]): void {
        array.push(...items);
    }

    static pushUnique(array: Array<any>, ...items: any[]): void {
        items.forEach((item) => {
            if (array.indexOf(item) < 0) {
                array.push(item);
            }
        });
    }

    static pushFlatten(array: Array<any>, ...items: any[]): void {
        items.forEach((item) => {
            if (ly.lang.isArray(item)) {
                arrays.pushFlatten(array, ...(item as Array<any>));
            } else {
                array.push(item);
            }
        });
    }

    static pushFlattenUnique(array: Array<any>, ...items: any[]): void {
        items.forEach((item) => {
            if (ly.lang.isArray(item)) {
                arrays.pushFlattenUnique(array, ...(item as Array<any>));
            } else {
                if (array.indexOf(item) < 0) {
                    array.push(item);
                }
            }
        });
    }

    static removeAt(array: Array<any>, index: number) {
        if (!!array && array.length > 0 && index < array.length) {
            array.splice(index, 1);
        }
    }

    static remove(array: Array<any>, ...items: any[]) {
        items.forEach((item) => {
            if (ly.lang.isArray(item)) {
                arrays.remove(array, ...(item as Array<any>));
            } else {
                const index: number = array.indexOf(item);
                if (array.indexOf(item) > -1) {
                    array.splice(index, 1);
                }
            }
        });
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}