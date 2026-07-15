import React from "react";
import { defaultRemovedNodeTypes } from "./childrenLabels.js";
import { childrenToArray } from "./childrenTools.js";
export function filterChildrenByType(children, filterType = "element") {
    const childArray = childrenToArray(children);
    if (filterType === "element") {
        return childArray.filter(React.isValidElement);
    }
    return childArray.filter((child) => typeof child === filterType);
}
/**
 * Returns the nullish React child category for a child.
 *
 * This helper exists because `typeof null` returns `"object"`, so null needs
 * explicit handling.
 *
 * @param child - A React child value.
 * @returns The matching nullish child type, or `null` if the child is renderable.
 */
export function getNullishReactType(child) {
    if (child === null)
        return "null";
    if (child === undefined)
        return "undefined";
    if (typeof child === "boolean")
        return "boolean";
    return null;
}
/**
 * Removes nullish or non-rendering children from React children.
 *
 * By default, this removes:
 *
 * - `null`
 * - `undefined`
 * - boolean children
 *
 * React normally renders these values as nothing, so removing them is useful
 * before filtering, mapping, counting, or transforming children.
 *
 * @param children - Any valid React children value.
 * @param removes - Which nullish child types to remove.
 * Defaults to `["null", "undefined", "boolean"]`.
 * @returns An array of children with the selected nullish values removed.
 *
 * @example
 * removeNullishChildren(children);
 *
 * @example
 * removeNullishChildren(children, ["null", "undefined"]);
 * // keeps boolean children
 *
 */
export function removeNullishChildren(children, removes = defaultRemovedNodeTypes) {
    return childrenToArray(children).filter((child) => {
        const nullishType = getNullishReactType(child);
        if (!nullishType)
            return true;
        return !removes.includes(nullishType);
    });
}
/**
 * Returns only valid React element children.
 *
 * This is a convenience wrapper around `filterChildrenByType(children, "element")`,
 * with a narrower return type.
 *
 * Use this when you want to ignore text, numbers, booleans, `null`,
 * `undefined`, and other non-element children before reading props,
 * cloning elements, mapping components, or applying element-level logic.
 *
 * @param children - Any valid React children value.
 * @returns An array containing only valid React elements.
 *
 * @example
 * const elements = filterElementChildren(children);
 *
 * elements.map((child) => child.props);
 */
export function filterElementChildren(children) {
    return filterChildrenByType(children, "element");
}
export function filterChildren(children, predicate) {
    return childrenToArray(children).filter(predicate);
}
