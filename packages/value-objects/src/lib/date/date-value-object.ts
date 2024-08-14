import { ValueObjectFactory } from '../value-object-factory';
import { type DateError } from './date-errors';

/**
 * Value object that stores and validates a date value.
 */
export const DateValueObject = <
  T,
  // On creation error, the returned if fails will be of type E extends `DateError`.
  E extends DateError,
  // By default the value is mandatory on his creation.
  O extends boolean = false,
>() => ValueObjectFactory<T, Date, E, O>();
