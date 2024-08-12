/**
 * Represents any primitive type which a value object can store or a function can receive.
 */
export type PrimitiveValue =
  | string
  | number
  | boolean
  | Date
  | object
  | symbol
  | bigint
  | undefined
  | null;
