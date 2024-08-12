/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Generic to represent a function definition.
 */
export type Func<R, P = any> = (...args: P[]) => R;
