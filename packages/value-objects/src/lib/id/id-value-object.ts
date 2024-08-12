import { ValueObjectFactory } from '../value-object-factory';
import { Uuid, UuidFormatValidator } from './id-decorators';
import type { IdError, UuidMalformedError } from './id-errors';

/**
 * Value object that stores a unique identifier (Id).
 */
const IdValueObject = <T, E extends IdError>() => ValueObjectFactory<T, string | undefined, E>();

/**
 * Value object that stores a UUID. It contains out-of-the-box default and validation for the UUID
 * format.
 *
 * @returns A UUID value object.
 */
export const UuidValueObject = <T>() => {
  @Uuid()
  @UuidFormatValidator()
  class UuidValueObject extends IdValueObject<T, UuidMalformedError>() {}
  return UuidValueObject;
};
