import { ValueObjectFactory } from '../value-object-factory';
import { type StringError } from './string-errors';

/**
 * Value object that stores and validates a string value.
 */
export const StringValueObject = <
  T,
  // On creation error, the returned if fails will be of type E extends `StringError`.
  E extends StringError,
  // By default the value is mandatory on his creation.
  O extends boolean = false,
>() => ValueObjectFactory<T, string, E, O>();
