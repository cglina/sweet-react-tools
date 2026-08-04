import type {
    Without,
    Either,
    AtLeastOne,
    AllOrNone,
} from "sweet-dev-tools";



///// UNION TYPES 

/**
 * Removes React's special `children` prop from an object shape.
 */
export type WithoutChildren<
    O extends object,
> = Omit<O, "children">;

type ChildrenProp = {
    children?: React.ReactNode;
};


/**
 * Creates a prop shape containing the keys unique to `A`,
 * while treating `children` as a standard shared prop.
 */
export type PropsWithout<
    A extends object,
    B extends object,
> =
    ChildrenProp &
    Without<
        WithoutChildren<A>,
        WithoutChildren<B>
    >;

/**
 * Creates mutually exclusive React prop shapes,
 * while treating `children` as a standard shared prop.
 */
export type PropsEither<
    A extends object,
    B extends object,
> =
    ChildrenProp &
    Either<
        WithoutChildren<A>,
        WithoutChildren<B>
    >;

/**
 * Requires at least one selected React prop,
 * while excluding `children` from the available keys.
 */
export type PropsAtLeastOne<
    O extends object,
    Keys extends keyof WithoutChildren<O> =
    keyof WithoutChildren<O>,
> =
    ChildrenProp &
    AtLeastOne<
        WithoutChildren<O>,
        Keys
    >;

/**
 * Requires all supplied React props or none,
 * while treating `children` as a standard shared prop.
 */
export type PropsAllOrNone<
    O extends object,
> =
    ChildrenProp &
    AllOrNone<
        WithoutChildren<O>
    >;