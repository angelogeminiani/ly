import ly from "../ly";

export default class arrays {

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}