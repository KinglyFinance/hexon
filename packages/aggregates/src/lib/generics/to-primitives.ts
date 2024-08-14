import { type EntityProperty, type EntityProps, type EntityType } from '../entity';

/**
 * Infers the value objects primitives types of a Entity. It supports arrays of value objects or
 * null props.
 */
export type ToPrimitives<T extends EntityType | EntityProps> = {
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
