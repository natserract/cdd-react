/* eslint-disable @typescript-eslint/no-explicit-any */

export type Any = any
export type TypeObject = { [key: string]: Any }

// Element/Attributes
export type HTMLAttributes<T = Any> =
    React.HTMLAttributes<T> & React.MutableRefObject<T>