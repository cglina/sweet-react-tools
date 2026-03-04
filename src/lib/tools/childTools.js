import { isReactElement } from "./elementTools"

/**
 * Ensures that children provided are valid React elements.    
 * Returns an array of React Elements – thus making 'only children' also iterable.
 * 
 * 
 * @param {object | object[]} children 
 * @returns {[] | object[]}
 */
export function arrayFromChildren(children) {
    const arrayChildren = Array.isArray(children) ? children : [children]
    if (arrayChildren.length == 0) {
        //// TO-DO: ERROR LOG NO CHILDREN
        return []
    }
    return arrayChildren
}

/**
 * Filters an array of objects/children to only include valid React objects.
 * 
 * If param strict = **false** (default), accepts any element/obj that has all base params: 'key', 'props' & 'type'.
 * 
 * If strict = **true**, will only accept elements that have a $$typeof property with a react Symbol value.
 * 
 * 
 * @param {object[]} children
 * @param {boolean} strict
 * @returns {[] | object[]}
 */
export function filteredReactChildren(children, strict = false) {
    if (!children) {
        //// TO-DO: error no children
        return []
    }
    const array = Array.isArray(children) ? children : [children]
    if (array.length === 0) {
        //// TO-DO: error log empty arr
        return []
    } else {
        const filtered = array.filter((item) => isReactElement(item, strict))
        return filtered
    }
}

/**
 * Provided with a children param, returns: 
 * - An array of string with all the children (Function) names, or
 * - an empty array if there are no children
 * @param {object | object[]} children 
 * @returns {[] | string[]}
 */
export function childNames(children) {
    const childArray = filteredReactChildren(children)
    if (childArray.length == 0) {
        /// TO-DO: error log children, no names!
        return []
    }
    // This ensures that the elements/objs provided will have a type prop:
    const list = childArray.map(({ type: func }) => func.name)
    return list
}

/**
 * Provided with an element's children, this function will return an array of simplified children data, including:
 * 
 * - index (position)
 * - (function) name
 * - key
 * - props
 * 
 * @param {object | object[]} children 
 * @returns {object[] | []}
 */
export function childList(children) {
    if (!children) {
        /// TO-DO: error log no children
    }
    const childArray = filteredReactChildren(children)
    if (childArray.length === 0) {
        /// TO-DO: error log no children
        return []
    }
    const list = childArray.map((child, index) => {
        const childObj = {
            index,
            name: child['type'].name,
            key: child['key'] ? child['key'] : '',
            props: child['props']
        }
        return childObj
    })
    return list
}

/**
 * Provided with a list of children, checks if a child with a specific name (the Function/JSX element name) is present amongst those children.
 * 
 * **Example:**  
 * If a \<SweetButton\/> component is one of the children provided:
 * 
 * **childExists(** *children*, 'SweetButton'**)**
 * 
 * will return *true*.
 * 
 * @param {object | object[]} children 
 * @param {string} childName The string to search for among JSX/RN/React element names.
 * @returns {boolean}
 */
export function childExists(children, childName) {
    if (!children) {
        /// TO-DO: error log no children
        return false
    }
    const childList = childNames(children)
    if (!childName || typeof childName != 'string') {
        console.log('/TO-DO: ADD ERROR, child empty or not string')
        return false
    } else if (childList.includes(childName)) {
        return true
    }
    return false
}

/**
 * Given a list of children, finds the child(ren) whose JSX/React/RN name is the same as the provided childName string param.
 * 
 * @param {object | object[]} children 
 * @param {string} childName The string used as a filter to search JSX/RN/React element names.
 * @param {boolean} first *default = false*. If set to true, will only return the first child obj with the given name, ie: not an array.
 * @returns {object | object[] | []} 
 */
export function findNamedChildren(children, childName, first = false) {
    if (!children) {
        /// TO-DO: error log no children
        return []
    }
    const childList = childList(children)
    const myChildren = childList.filter(({ name }) => name == childName)
    if (first && myChildren.length > 0) {
        return myChildren[0]
    }
    return myChildren
}

/**
 * Given a 'children' param, will return an object with information about:
 * 
 *- the parent obj
 *- the grandparent obj
 *- the children 
 * 
 * @param {object | object[]} children 
 * @param {string} childName The string used as a filter to search JSX/RN/React element names.
 * @param {boolean} first *default = false*. If set to true, will only return the first child obj with the given name, ie: not an array.
 * @returns {object | object[] | []} 
 */

/*
export function familyTree(children) {
   const resultingObj = {}
   if (!children) {
       /// TO-DO: error log no children
       return resultingObj
   }
   const kids = filteredReactChildren(children)
   const parentData = kids[0]['_owner']
   if (parentData) {
       const { type, alternate } = parentData
       const grandParent = type['name']
       const { child: { type: parent, pendingProps }, childLanes, siblings, key, index } = alternate
       resultingObj.parent = parent['name']
       resultingObj.childCount = childLanes
       resultingObj.grandParent = grandParent
       resultingObj.siblings = siblings
       resultingObj.parentKey = key
       resultingObj.parentProps = pendingProps ///// FILTER CHILDREN OUT!!!!
       resultingObj.parentIndex = index
   }
}

*/