import { type Either } from 'effect';
import z from 'zod';

import { E } from '@hexon/common';

import {
  NumberBelowMinimumError,
  NumberExceedsMaximumError,
  NumberNegativeError,
  NumberNotInRangeError,
  NumberNotIntegerError,
  NumberPositiveError,
} from './number-errors';

/**
 * Validates if a number exceeds the maximum value.
 *
 * @param value - The number to validate.
 * @param max - The maximum value to validate.
 * @returns If the validation fails, it returns a `NumberExceedsMaximumError`, otherwise it
 * returns `true`.
 */
export const numberMaxValidator = (
  value: number,
  max: number,
): Either.Either<boolean, NumberExceedsMaximumError> =>
  E.toPredicate({
    predicate: () => z.number().max(max).safeParse(value).success,
    error: new NumberExceedsMaximumError({
      message: `Number exceeds maximum value: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates if a number is below the minimum value.
 *
 * @param value - The number to validate.
 * @param min - The minimum value to validate.
 * @returns If the validation fails, it returns a `NumberBelowMinimumError`, otherwise it
 * returns `true`.
 */
export const numberMinValidator = (
  value: number,
  min: number,
): Either.Either<boolean, NumberBelowMinimumError> =>
  E.toPredicate({
    predicate: () => z.number().min(min).safeParse(value).success,
    error: new NumberBelowMinimumError({
      message: `Number below minimum value: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates if a number is an integer.
 *
 * @param value - The number to validate.
 * @returns If the validation fails, it returns a `NumberNotIntegerError`, otherwise it
 * returns `true`.
 */
export const numberIntegerValidator = (
  value: number,
): Either.Either<boolean, NumberNotIntegerError> =>
  E.toPredicate({
    predicate: () => z.number().int().safeParse(value).success,
    error: new NumberNotIntegerError({
      message: `Number is not an integer: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates if a number is positive.
 *
 * @param value - The number to validate.
 * @returns If the validation fails, it returns a `NumberNegativeError`, otherwise it
 * returns `true`.
 */
export const numberPositiveValidator = (
  value: number,
): Either.Either<boolean, NumberNegativeError> =>
  E.toPredicate({
    predicate: () => z.number().nonnegative().safeParse(value).success,
    error: new NumberNegativeError({
      message: `Number is negative and should be positive: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates if a number is negative.
 *
 * @param value - The number to validate.
 * @returns If the validation fails, it returns a `NumberPositiveError`, otherwise it
 * returns `true`.
 */
export const numberNegativeValidator = (
  value: number,
): Either.Either<boolean, NumberPositiveError> =>
  E.toPredicate({
    predicate: () => z.number().negative().safeParse(value).success,
    error: new NumberPositiveError({
      message: `Number is positive and should be negative: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates if a number is in the expected range.
 *
 * @param value - The number to validate.
 * @param min - The minimum value to validate.
 * @param max - The maximum value to validate.
 *
 * @returns If the validation fails, it returns a `NumberNotInRangeError`, otherwise it
 * returns `true`.
 */
export const numberRangeValidator = (
  value: number,
  min: number,
  max: number,
): Either.Either<boolean, NumberNotInRangeError> =>
  E.toPredicate({
    predicate: () => z.number().min(min).max(max).safeParse(value).success,
    error: new NumberNotInRangeError({
      message: `Number is not in range [${min}, ${max}]: ${value}`,
      data: { value },
    }),
  });
