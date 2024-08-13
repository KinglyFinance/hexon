import { ValueObjectFactory } from '../value-object-factory';
import { type DateError } from './date-errors';

/**
 * Value object that stores and validates a date value.
 */
export const DateValueObject = <T, E extends DateError>() => ValueObjectFactory<T, Date, E>();
