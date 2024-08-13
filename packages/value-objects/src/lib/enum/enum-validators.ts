import { type Either } from 'effect';

import { E, type PrimitiveValue } from '@hexon/common';

import { EnumInvalidMemberError } from './enum-errors';
import type { EnumKeyType } from './enum-value-object';

/**
 * Checks if the enum contains the given value.
 *
 * @param value - The value to check.
 * @param allowedValues - The supported values of the enum.
 * @returns If the validation fails, it returns a `EnumValueNotFoundError`, otherwise `true`.
 */
export const enumContainsValidator = (
  value: EnumKeyType,
  allowedValues: PrimitiveValue[],
): Either.Either<boolean, EnumInvalidMemberError> =>
  E.toPredicate({
    predicate: () => allowedValues.includes(value),
    error: new EnumInvalidMemberError({
      message: `Invalid enum value: ${String(value)}`,
      data: {
        value,
        allowedValues,
      },
    }),
  });
