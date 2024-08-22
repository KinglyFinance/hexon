import { type PrimitiveValue } from '@hexon/common';
import { type ValueObject } from '@hexon/value-objects';

type StringOperators = 'equals' | 'notEqual' | 'contains' | 'endsWith' | 'startsWith';
type NumberOperators = 'equals' | 'notEqual' | 'lt' | 'lte' | 'gt' | 'gte';
type DateOperators = 'equals' | 'notEqual' | 'lt' | 'lte' | 'gt' | 'gte';
type BooleanOperators = 'equals' | 'notEqual';
type ArrayOperators = 'contains' | 'notContains';

/**
 * Operators for filtering. The type of operator depends on the type of the value object.
 */
export type Operators<T> =
  T extends ValueObject<string>
    ? StringOperators
    : T extends ValueObject<number>
      ? NumberOperators
      : T extends ValueObject<boolean>
        ? BooleanOperators
        : T extends Date
          ? DateOperators
          : T extends ValueObject<PrimitiveValue>[]
            ? ArrayOperators
            : never;

export type FieldValue<T, K extends keyof T> = T[K];
export type LogicalOperator = 'AND' | 'OR' | 'NOT';

/**
 * Criteria filter.
 */
export interface Filter<T, K extends keyof T = keyof T> {
  field: K;
  operator: Operators<T[K]>;
  value: FieldValue<T, K>;
}
