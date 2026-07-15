/**
 * React child values that are commonly treated as "empty" or non-rendering.
 *
 * React ignores `null`, `undefined`, `true`, and `false` when rendering children.
 */
export type NullishReactType = "null" | "undefined" | "boolean";
/**
 * Supported child categories for `filterChildrenByType`.
 *
 * - `"element"` matches valid React elements such as `<View />`, `<Text />`, or custom components.
 * - `"string"` matches text children.
 * - `"number"` matches numeric children.
 * - `"bigint"` matches bigint children.
 */
export type SweetChildTypeName = "string" | "number" | "bigint" | "element";
/**
 * Default child types removed by `removeNullishChildren`.
 *
 * These values normally render nothing in React.
 */
export declare const defaultRemovedNodeTypes: NullishReactType[];
