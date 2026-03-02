/**
 * Ensures that children provided are valid React elements.    
 * Returns an array of React Elements – thus making 'only children' also iterable.
 *  
 * @param {object | object[]} children 
 * @returns {object[]}
 */
function arrayFromChildren(children) {
    const childArray = Array.isArray(children) ? children : [children]
    if (childArray.length == 0) {
        console.log()
    }
}

function childNames(children) {
    const childArray = arrayFromChildren(children)
    const list = childArray.map(({ type: func }) => func.name)
    return list
}

function childList(children) {
    const childArray = arrayFromChildren(children)
    const list = childArray.map((child, index) => {
        const childObj = {
            index,
            name: child['type'].name,
            key: child['key'],
            props: child['props']
        }
        return childObj
    })
    return list
}

function hasThisChild(children, name) {
    const childList = childNames(children)
    if (!name || typeof name != 'string') {
        console.log('/TO-DO: ADD ERROR, child empty or not string')
        return false
    } else if (childList.includes(name)) {
        return true
    }
    return false
}

function familyTree(children, fullTree = true) {
    const kids = arrayFromChildren(children)

}