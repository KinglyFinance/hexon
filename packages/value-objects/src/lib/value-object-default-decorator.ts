import { type PrimitiveValue } from '@hexon/common';

import { type DefaultValueFunction } from './value-object';
import { type ValueObjectType } from './value-object-type';

/**
 * Decorator that adds a default value function to the value object.
 */
export function DefaultValueFn<V extends PrimitiveValue>(fn: DefaultValueFunction<V>) {
  return function (target: ValueObjectType) {
    target.defaultValueFn = fn;
  };
}
