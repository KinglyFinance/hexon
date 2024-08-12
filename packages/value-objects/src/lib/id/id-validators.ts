import { type Either } from 'effect';
import { validate } from 'uuid';

import { E } from '@hexon/common';

import { UuidMalformedError } from './id-errors';

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
      message: `Invalid length for string: ${value}`,
      data: {
        value,
        technique: 'uuid',
      },
    }),
  });
