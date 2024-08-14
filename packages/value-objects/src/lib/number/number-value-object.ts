import { ValueObjectFactory } from '../value-object-factory';
import { type NumberError } from './number-errors';

/**
 * Value object that stores and validates a number value.
 */
export const NumberValueObject = <
  T,
  // On creation error, the returned if fails will be of type E extends `NumberError`.
  E extends NumberError,
  // By default the value is mandatory on his creation.
  O extends boolean = false,
>() => ValueObjectFactory<T, number, E, O>();
