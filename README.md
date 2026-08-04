# Sweet React Tools
![npm](https://img.shields.io/npm/v/sweet-react-tools)
![license](https://img.shields.io/npm/l/sweet-react-tools)
![typescript](https://img.shields.io/badge/TypeScript-ready-blue)

A library of **practical** & **reusable** React utilities designed to make working with **children**, **props**, and common React patterns simpler, safer, and more consistent.

> ⚠️ **Work in Progress**
>
> Sweet React Tools is currently in its early stages.
>
> The project is intentionally being built alongside real applications, with new utilities added only after proving useful in practice.
>
> The current release focuses on a small set of foundational helpers for working with React children and props.

- [Overview](#overview-)
- [Installation](#installation)
- [Contents](#contents)
  - [Children Tools](#-children-tools)
  - [Props Tools](#-props-tools)
- [Planned Next Steps](#planned-next-steps)

## Overview ✨

Sweet React Tools focuses on making everyday React development a little more pleasant by providing small, composable helpers for common React tasks.

Current goals include:

- reducing repetitive React boilerplate
- safer handling of `children`
- simpler props inspection
- predictable, TypeScript-friendly APIs
- excellent IntelliSense
- small, focused utilities

Like the rest of the Sweet ecosystem, this library is **application-driven**.

New utilities are extracted from real applications rather than designed in isolation.

> **tl;dr:** Small React helpers. Practical, predictable, reusable. ✨

## Installation

```bash
npm install sweet-react-tools
```

Sweet React Tools is built on top of **Sweet JS Tools**, installed automatically as a dependency.

## Contents

<a name="children-tools"></a>

### 👶 Children Tools

Utilities for working with React children safely and consistently.

Current helpers include:

- convert children into arrays: `childrenToArray`
- generic child filtering: `filterChildren`
- filter by runtime child type: `filterChildrenByType`
- filter only React elements: `filterElementChildren`
- remove non-rendering children: `removeNullishChildren`

#### Example usage

```tsx
const elements = filterElementChildren(props.children);

const textChildren = filterChildrenByType(
    props.children,
    "string"
);

const renderableChildren = removeNullishChildren(
    props.children
);
```

##

<a name="props-tools"></a>

### 🧩 ### 🧩 Props Tools

Runtime and compile-time utilities for inspecting, constraining,
and working with React component props.

Current helpers include:

**Runtime (`propTools`)**

- check whether props exist: `hasProps`
- check for a `children` prop: `hasChildren`
- check for renderable children: `hasRenderableChildren`
- retrieve prop keys: `getPropKeys`
- check for specific prop keys: `hasPropKeys`

**Typing (`propUnions`)**

- remove the `children` prop from a prop shape: `WithoutChildren`
- create prop shapes by excluding shared properties: `PropsWithout`
- create mutually exclusive prop shapes: `PropsEither`
- require at least one prop: `PropsAtLeastOne`
- require all props or none: `PropsAllOrNone`

#### Example usage

```tsx
if (hasRenderableChildren(props)) {
    // ...
}

if (hasPropKeys(props, ["disabled", "variant"])) {
    // ...
}

const keys = getPropKeys(props);

type ProviderProps =
    PropsEither<
        ConfigProps,
        GranularProps
    >;

type ButtonProps = PropsAtLeastOne<{
    label?: string;
    icon?: React.ReactNode;
}>;

type RangeProps = PropsAllOrNone<{
    min: number;
    max: number;
}>
```

# Planned Next Steps

The following utilities are planned, but will only be added after being validated through real-world application development.

## Children

- `mapChildren`
- `mapElementChildren`
- `findChild`
- `onlyChild`
- `countChildren`
- `someChildren`
- `everyChild`
- `filterChildrenByProp`
- `filterChildrenByPropValue`

## Elements

Element inspection utilities are currently on hold.

The original goal was to provide a friendlier API for inspecting React elements, but this area will be revisited after further real-world usage determines the most useful abstractions.

## Future

Potential future areas include:

- React hooks
- Context helpers
- Component composition
- Element manipulation
- Compound component helpers

As with every Sweet package, these features will only be extracted from repeated use in production applications.