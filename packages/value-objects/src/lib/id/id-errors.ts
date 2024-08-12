import { ErrorFactory } from '@hexon/errors';

/**
 * Data for Id errors.
 */
type IdErrorData = {
  value: string;
  technique: 'uuid' | 'ulid' | 'nanoId';
};

/**
 * Mapper for Id errors.
 */
const IdErrorMapper = {
  UUID_MALFORMED_ERROR: 'VALUE_OBJECT_ERROR',
  ULID_MALFORMED_ERROR: 'VALUE_OBJECT_ERROR',
  NANOID_MALFORMED_ERROR: 'VALUE_OBJECT_ERROR',
} as const;

/**
 * Factory for Id errors.
 */
const IdErrorFactory = ErrorFactory<typeof IdErrorMapper, IdErrorData>(IdErrorMapper);

/**
 * Id error when the uuid has a bad format.
 */
class UuidMalformedError extends IdErrorFactory('UUID_MALFORMED_ERROR') {}

/**
 * Id error when the ulid has a bad format.
 */
class UlidMalformedError extends IdErrorFactory('ULID_MALFORMED_ERROR') {}

/**
 * Id error when the nanoId has a bad format.
 */
class NanoIdMalformedError extends IdErrorFactory('NANOID_MALFORMED_ERROR') {}

/**
 * Contains all the possible Id errors.
 */
type IdError = UuidMalformedError | UlidMalformedError | NanoIdMalformedError;

export { IdError, NanoIdMalformedError, UlidMalformedError, UuidMalformedError };
