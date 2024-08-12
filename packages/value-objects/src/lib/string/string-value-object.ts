import { ValueObjectFactory } from '../value-object-factory';
import { type StringError } from './string-errors';

/**
 * Value object that stores and validates a string value.
 */
export const StringValueObject = <T, E extends StringError>() => ValueObjectFactory<T, string, E>();
