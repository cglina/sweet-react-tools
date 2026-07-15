import { isObject, objectX } from "sweet-js-tools";
import { removeNullishChildren } from "../children/childrenFilters.js";
/**
 * Checks whether a value can safely be treated as a props object.
 *
 * Excludes `null`, arrays, and non-object values.
 *
 * @param props - The value to check.
 * @returns `true` when the value is a props-compatible object.
 */
function isPropsObject(props) {
    return isObject(props);
}
/**
 * Checks whether a props object contains at least one own enumerable property.
 *
 * Uses Sweet's X rules, where an empty object is not considered a usable
 * object value.
 *
 * @param props - The props object to inspect.
 * @returns `true` when props is a non-empty object.
 */
export function hasProps(props) {
    return isObject(props) && objectX(props);
}
/**
 * Checks whether a props object declares a `children` property.
 *
 * This checks for the presence of the key itself. It may therefore return
 * `true` when `children` is `null`, `undefined`, `false`, or otherwise
 * non-rendering.
 *
 * @param props - The props object to inspect.
 * @returns `true` when the `children` key exists.
 */
export function hasChildren(props) {
    return isPropsObject(props) && "children" in props;
}
/**
 * Returns the enumerable keys of a non-empty props object.
 *
 * @param props - The props object to inspect.
 * @returns The prop keys, or an empty array when props is missing or empty.
 */
export function getPropKeys(props) {
    if (!hasProps(props))
        return [];
    return Object.keys(props);
}
/**
 * Checks whether a props object contains every or some of the requested keys.
 *
 * @param props - The props object to inspect.
 * @param checkKeys - The prop keys to look for.
 * @param checkMode - Whether every key or at least one key must exist.
 * Defaults to `"every"`.
 * @returns `false` when props or `checkKeys` are empty; otherwise, whether
 * the requested keys satisfy the selected mode.
 *
 * @example
 * ```ts
 * hasPropKeys(props, ["disabled", "variant"]);
 * // true only when both keys exist
 * ```
 *
 * @example
 * ```ts
 * hasPropKeys(props, ["disabled", "loading"], "some");
 * // true when at least one key exists
 * ```
 */
export function hasPropKeys(props, checkKeys = [], checkMode = "every") {
    const propKeys = getPropKeys(props);
    if (propKeys.length === 0 || checkKeys.length === 0) {
        return false;
    }
    if (checkMode === "every") {
        return checkKeys.every((key) => propKeys.includes(key));
    }
    return checkKeys.some((key) => propKeys.includes(key));
}
/**
 * Checks whether a props object contains renderable children.
 *
 * Unlike `hasChildren()`, this checks whether the `children` prop contains
 * at least one child that React would actually render.
 *
 * Children such as `null`, `undefined`, and boolean values are ignored,
 * matching React's rendering behavior.
 *
 * @param props - The props object to inspect.
 * @returns `true` when at least one renderable child exists.
 *
 * @example
 * hasRenderableChildren({
 *   children: "Hello"
 * });
 * // true
 *
 * @example
 * hasRenderableChildren({
 *   children: null
 * });
 * // false
 *
 * @example
 * hasRenderableChildren({
 *   children: [null, false, <Text>Hello</Text>]
 * });
 * // true
 */
export function hasRenderableChildren(props) {
    if (!props || !hasChildren(props)) {
        return false;
    }
    return removeNullishChildren(props.children).length > 0;
}
