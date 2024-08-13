import { ValueObjectFactory } from '../value-object-factory';
import { type NumberError } from './number-errors';

/**
 * Value object that stores and validates a number value.
 */
export const NumberValueObject = <T, E extends NumberError>() => ValueObjectFactory<T, number, E>();
