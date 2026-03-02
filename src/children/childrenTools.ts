import React from "react";

/**
 * Converts React children into a flat array.
 *
 * This is a small convenience wrapper around `React.Children.toArray`.
 * It safely handles no children, one child, multiple children, fragments,
 * and mixed children.
 *
 * @param children - Any valid React children value.
 * @returns A flat array of React nodes.
 *
 * @example
 * childrenToArray(props.children);
 */
export function childrenToArray(
    children: React.ReactNode
): React.ReactNode[] {
    return React.Children.toArray(children);
}
