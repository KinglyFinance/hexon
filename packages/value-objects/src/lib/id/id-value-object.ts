import { ValueObjectFactory } from '../value-object-factory';
import {
  NanoId,
  NanoIdFormatValidator,
  Ulid,
  UlidFormatValidator,
  Uuid,
  UuidFormatValidator,
} from './id-decorators';
import type { IdError, UlidMalformedError, UuidMalformedError } from './id-errors';

/**
 * Value object that stores a unique identifier (Id).
 */
const IdValueObject = <T, E extends IdError>() => ValueObjectFactory<T, string | undefined, E>();

/**
 * Value object that stores a UUID. It contains out-of-the-box default and validation for the UUID
 * format.
 *
 * @returns A UUID value object class to be extended.
 */
export const UuidValueObject = <T>() => {
  @Uuid()
  @UuidFormatValidator()
  class UuidValueObject extends IdValueObject<T, UuidMalformedError>() {}
  return UuidValueObject;
};

/**
 * Value object that stores a ULID. It contains out-of-the-box default and validation for the ULID
 * format.
 *
 * @returns A ULID value object class to be extended.
 */
export const UlidValueObject = <T>() => {
  @Ulid()
  @UlidFormatValidator()
  class UlidValueObject extends IdValueObject<T, UlidMalformedError>() {}
  return UlidValueObject;
};

/**
 * Value object that stores a nanoid. It contains out-of-the-box default and validation for the
 * nanoid format.
 *
 * @returns A nanoid value object class to be extended.
 */
export const NanoIdValueObject = <T>() => {
  @NanoId()
  @NanoIdFormatValidator()
  class NanoIdValueObject extends IdValueObject<T, UlidMalformedError>() {}
  return NanoIdValueObject;
};
