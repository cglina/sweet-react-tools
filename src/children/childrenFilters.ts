import React from "react";

import { defaultRemovedNodeTypes, type NullishReactType, type SweetChildTypeName } from "./childrenLabels.js";
import { childrenToArray } from "./childrenTools.js";


/**
 * Filters React children by child type.
 *
 * By default, this returns only valid React elements.
 *
 * This is useful when a component accepts mixed children but needs to work
 * only with elements, text nodes, numbers, or bigint values.
 *
 * @param children - Any valid React children value.
 * @param filterType - The child type to keep. Defaults to `"element"`.
 * @returns An array containing only children of the requested type.
 *
 * @example
 * filterChildrenByType(children);
 * // keeps only React elements
 *
 * @example
 * filterChildrenByType(children, "string");
 * // keeps only string children
 */
export function filterChildrenByType(
    children: React.ReactNode,
    filterType?: "element"
): React.ReactElement[];

export function filterChildrenByType(
    children: React.ReactNode,
    filterType: "string"
): string[];

export function filterChildrenByType(
    children: React.ReactNode,
    filterType: "number"
): number[];

export function filterChildrenByType(
    children: React.ReactNode,
    filterType: "bigint"
): bigint[];

export function filterChildrenByType(
    children: React.ReactNode,
    filterType: SweetChildTypeName = "element"
): React.ReactNode[] {
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
export function getNullishReactType(
    child: React.ReactNode
): NullishReactType | null {
    if (child === null) return "null";
    if (child === undefined) return "undefined";
    if (typeof child === "boolean") return "boolean";

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
export function removeNullishChildren(
    children: React.ReactNode,
    removes: NullishReactType[] = defaultRemovedNodeTypes
): React.ReactNode[] {
    return childrenToArray(children).filter((child) => {
        const nullishType = getNullishReactType(child);

        if (!nullishType) return true;

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
export function filterElementChildren(
    children: React.ReactNode
): React.ReactElement[] {
    return filterChildrenByType(children, "element") as React.ReactElement[];
}

/**
 * Filters React children using a given predicate function (second param).
 *
 * This is a React-friendly wrapper around `childrenToArray(children).filter(...)`.
 * It lets you filter `props.children` directly without manually converting them
 * to an array first.
 *
 * Supports type guard predicates, so TypeScript can infer a narrower return type.
 *
 * @param children - Any valid React children value.
 * @param predicate - Function used to decide which children to keep.
 * @returns An array containing only children that match the predicate.
 *
 * @example
 * const stringChildren = filterChildren(
 *   children,
 *   (child): child is string => typeof child === "string"
 * );
 *
 * @example
 * const elementChildren = filterChildren(
 *   children,
 *   React.isValidElement
 * );
 */
export function filterChildren<T extends React.ReactNode>(
    children: React.ReactNode,
    predicate: (child: React.ReactNode) => child is T
): T[];

export function filterChildren(
    children: React.ReactNode,
    predicate: (child: React.ReactNode) => boolean
): React.ReactNode[];

export function filterChildren(
    children: React.ReactNode,
    predicate: (child: React.ReactNode) => boolean
): React.ReactNode[] {
    return childrenToArray(children).filter(predicate);
}
