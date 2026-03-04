/**
 * Checks if a given item is a React Element.
 * @param {object} item
 * @returns {boolean}
 */

const reactBaseProps = ['key', 'type', 'props']

/**
 * Checks if a given element is a valid React/JSX element.  
 * 
 * If param strict = **false** (default), accepts any element/obj that has all base params: 'key', 'props' & 'type'.
 * 
 * If strict = **true**, will only accept elements that have a $$typeof property with a react Symbol value.
 * 
 * @param {object} item 
 * @param {boolean} strict 
 * @returns {boolean}
 */
export function isReactElement(item, strict = false) {
    if (typeof item !== 'object') {
        //// TO-DO: error log not obj
        return false
    }
    const sym = Object.values(item)[0]
    const symKey = Symbol.keyFor(sym)
    if (typeof symKey == 'string' && symKey.includes('react')) {
        return true
    } else if (strict) {
        return false
    } else {
        const elKeys = Object.keys(item)
        if (reactBaseProps.every((key) => elKeys.includes(key))) {
            return true
        } else {
            return false
        }
    }
}

/**
 * Filters an array of objects/children to only include valid React objects.
 * 
 * If param strict = **false** (default), accepts any element/obj that has all base params: 'key', 'props' & 'type'.
 * 
 * If strict = **true**, will only accept elements that have a $$typeof property with a react Symbol value.
 * 
 * 
 * @param {object[]} array
 * @param {boolean} strict
 * @returns {[] | object[]}
 */
export function filteredReactArray(children, strict = false) {
    const array = Array.isArray(children) ? children : [children]
    if (array.length === 0) {
        //// TO-DO: error log empty arr
        return []
    } else {
        const filtered = array.filter((item) => isReactElement(item, strict))
        return filtered
    }
}