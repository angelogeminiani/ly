export interface ComponentProps {
    [key: string]: any;
}


/**
 * Sample view function
 * @param {string} uid
 * @param {ComponentProps} props
 * @return {string}
 */
export default function view(uid: string, props?: ComponentProps): string {

        return `
            <div id="${uid}">
                ${ !!props ? props.test : "" }
            </div>
        `;

}
