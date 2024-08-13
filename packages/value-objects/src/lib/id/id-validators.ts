import { type Either } from 'effect';
import { validate } from 'uuid';
import z from 'zod';

import { E } from '@hexon/common';

import { NanoIdMalformedError, UlidMalformedError, UuidMalformedError } from './id-errors';

/**
 * Validates the format of a UUID.
 *
 * @param value - The UUID to validate.
 * @returns If the validation fails, it returns a `UuidMalformedError`, otherwise it returns `true`.
 */
export const uuidFormatValidator = (value: string): Either.Either<boolean, UuidMalformedError> =>
  E.toPredicate({
    predicate: () => validate(value),
    error: new UuidMalformedError({
      message: `Invalid UUID: ${value}`,
      data: {
        value,
        technique: 'uuid',
      },
    }),
  });

/**
 * Validates the format of a ULID.
 *
 * @param value - The ULID to validate.
 * @returns If the validation fails, it returns a `UlidMalformedError`, otherwise it returns `true`.
 */
export const ulidFormatValidator = (value: string): Either.Either<boolean, UlidMalformedError> => {
  // This is the regex for ULIDs.
  const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;

  return E.toPredicate({
    predicate: () => z.string().regex(ulidRegex).safeParse(value).success,
    error: new UlidMalformedError({
      message: `Invalid ULID: ${value}`,
      data: {
        value,
        technique: 'ulid',
      },
    }),
  });
};

/**
 * Validates the format of a nanoid.
 *
 * @param value - The nanoid to validate.
 * @returns If the validation fails, it returns a `NanoIdMalformedError`, otherwise it returns `true`.
 */
export const nanoIdFormatValidator = (
  value: string,
): Either.Either<boolean, NanoIdMalformedError> => {
  // This is the regex for nanoids.
  const nanoidRegex = /^[A-Za-z0-9_-]{21}$/;

  return E.toPredicate({
    predicate: () => z.string().regex(nanoidRegex).safeParse(value).success,
    error: new NanoIdMalformedError({
      message: `Invalid nanoid: ${value}`,
      data: {
        value,
        technique: 'nanoId',
      },
    }),
  });
};
