export type CheckMode = "every" | "some";

/**
 * Generic object containing component-like properties.
 *
 * This type represents a plain collection of key-value pairs and serves as
 * the base props type for Sweet React Tools.
 *
 * Unlike `SweetComponentProps`, it intentionally does **not** include the
 * special React `children` prop.
 */
export type SweetProps = {
    [key: string]: unknown;
};

/**
 * Standard React component props.
 *
 * Extends `SweetProps` by adding React's optional `children` prop.
 */
export type SweetComponentProps = SweetProps & {
    children?: React.ReactNode;
};


export type SimplePropValue =
    | string
    | number
    | boolean;

export type SimplePropValues = SimplePropValue[];
