import React from "react";
import { type NullishReactType } from "./childrenLabels.js";
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
export declare function filterChildrenByType(children: React.ReactNode, filterType?: "element"): React.ReactElement[];
export declare function filterChildrenByType(children: React.ReactNode, filterType: "string"): string[];
export declare function filterChildrenByType(children: React.ReactNode, filterType: "number"): number[];
export declare function filterChildrenByType(children: React.ReactNode, filterType: "bigint"): bigint[];
/**
 * Returns the nullish React child category for a child.
 *
 * This helper exists because `typeof null` returns `"object"`, so null needs
 * explicit handling.
 *
 * @param child - A React child value.
 * @returns The matching nullish child type, or `null` if the child is renderable.
 */
export declare function getNullishReactType(child: React.ReactNode): NullishReactType | null;
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
export declare function removeNullishChildren(children: React.ReactNode, removes?: NullishReactType[]): React.ReactNode[];
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
export declare function filterElementChildren(children: React.ReactNode): React.ReactElement[];
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
export declare function filterChildren<T extends React.ReactNode>(children: React.ReactNode, predicate: (child: React.ReactNode) => child is T): T[];
export declare function filterChildren(children: React.ReactNode, predicate: (child: React.ReactNode) => boolean): React.ReactNode[];
