import { type EntityProperty, type EntityProps } from '../entity';

/**
 * Infers the value objects primitives of a entity properties.
 */
export type ToPrimitives<T extends EntityProps> = {
  [K in keyof T as T[K] extends EntityProperty | EntityProperty[] | null
    ? K
    : never]: T[K] extends { value: infer V }
    ? V
    : T[K] extends Array<{ value: infer AV }>
      ? Array<AV>
      : T[K] extends { value: infer NUV } | null
        ? NUV | null
        : T[K];
};
