import { type Either } from 'effect';
import z from 'zod';

import { E } from '@hexon/common';

import {
  DateAfterError,
  DateBeforeError,
  DateFutureError,
  DateInvalidError,
  DateMaxAgeError,
  DateNotInRangeError,
  DateNotWeekdayError,
  DateNotWeekendError,
  DatePastError,
} from './date-errors';

/**
 * Validates if a date is valid.
 *
 * @param value - The date to validate.
 * @returns If the validation fails, it returns a `DateInvalidError`, otherwise it returns `true`.
 */
export const dateIsValidValidator = (value: Date): Either.Either<boolean, DateInvalidError> =>
  E.toPredicate({
    predicate: () => z.date().safeParse(value).success,
    error: new DateInvalidError({
      message: `Invalid date: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates if a date is in the past.
 *
 * @param value - The date to validate.
 * @returns If the validation fails, it returns a `DateFutureError`, otherwise it returns `true`.
 */
export const dateIsPastValidator = (value: Date): Either.Either<boolean, DatePastError> => {
  const isPast = value < new Date();
  return E.toPredicate({
    predicate: () => isPast,
    error: new DatePastError({
      message: `Date is in the past: ${value}`,
      data: { value },
    }),
  });
};

/**
 * Validates if a date is in the future.
 *
 * @param value - The date to validate.
 * @returns If the validation fails, it returns a `DateFutureError`, otherwise it returns `true`.
 */
export const dateIsFutureValidator = (value: Date): Either.Either<boolean, DateFutureError> => {
  const isFuture = value > new Date();
  return E.toPredicate({
    predicate: () => isFuture,
    error: new DateFutureError({
      message: `Date is in the future: ${value}`,
      data: { value },
    }),
  });
};

/**
 * Validates if a date is before the expected date.
 *
 * @param value - The date to validate.
 * @param expected - The expected date to validate.
 * @returns If the validation fails, it returns a `DateAfterError`, otherwise it returns `true`.
 */
export const dateIsBeforeValidator = (
  value: Date,
  expected: Date,
): Either.Either<boolean, DateAfterError> => {
  const isBefore = value < expected;
  return E.toPredicate({
    predicate: () => isBefore,
    error: new DateAfterError({
      message: `Date is after the expected date ${expected}: ${value}`,
      data: { value },
    }),
  });
};

/**
 * Validates if a date is after the expected date.
 *
 * @param value - The date to validate.
 * @param expected - The expected date to validate.
 * @returns If the validation fails, it returns a `DateBeforeError`, otherwise it returns `true`.
 */
export const dateIsAfterValidator = (
  value: Date,
  expected: Date,
): Either.Either<boolean, DateBeforeError> => {
  const isAfter = value > expected;
  return E.toPredicate({
    predicate: () => isAfter,
    error: new DateBeforeError({
      message: `Date is before the expected date ${expected}: ${value}`,
      data: { value },
    }),
  });
};

/**
 * Validates if a date is older than the expected age.
 *
 * @param value - The date to validate.
 * @param age - The expected age to validate.
 * @returns If the validation fails, it returns a `DateMaxAgeError`, otherwise it returns `true`.
 */
export const dateMaxAgeValidator = (
  value: Date,
  age: number,
): Either.Either<boolean, DateMaxAgeError> => {
  const isOlder = value < new Date(new Date().setFullYear(new Date().getFullYear() - age));
  return E.toPredicate({
    predicate: () => isOlder,
    error: new DateMaxAgeError({
      message: `Date is younger than the expected age ${age}: ${value}`,
      data: { value },
    }),
  });
};

/**
 * Validates if a date is in the expected range.
 *
 * @param value - The date to validate.
 * @param min - The minimum date to validate.
 * @param max - The maximum date to validate.
 * @returns If the validation fails, it returns a `DateNotInRangeError`, otherwise it returns `true`.
 */
export const dateInRangeValidator = (
  value: Date,
  min: Date,
  max: Date,
): Either.Either<boolean, DateNotInRangeError> => {
  const isInRange = value >= min && value <= max;
  return E.toPredicate({
    predicate: () => isInRange,
    error: new DateNotInRangeError({
      message: `Date is not in range [${min}, ${max}]: ${value}`,
      data: { value },
    }),
  });
};

/**
 * Validates if a date falls on a weekday.
 *
 * @param value - The date to validate.
 * @returns If the validation fails, it returns a `DateNotWeekdayError`, otherwise it returns `true`.
 */
export const dateIsWeekdayValidator = (
  value: Date,
): Either.Either<boolean, DateNotWeekdayError> => {
  const day = value.getDay();
  const isWeekday = day >= 1 && day <= 5;
  return E.toPredicate({
    predicate: () => isWeekday,
    error: new DateNotWeekdayError({
      message: `Date is not on a weekday: ${value}`,
      data: { value },
    }),
  });
};

/**
 * Validates if a date falls on a weekend.
 *
 * @param value - The date to validate.
 * @returns If the validation fails, it returns a `DateNotWeekendError`, otherwise it returns `true`.
 */
export const dateIsWeekendValidator = (
  value: Date,
): Either.Either<boolean, DateNotWeekendError> => {
  const day = value.getDay();
  const isWeekend = day === 0 || day === 6;
  return E.toPredicate({
    predicate: () => isWeekend,
    error: new DateNotWeekendError({
      message: `Date is not on a weekend: ${value}`,
      data: { value },
    }),
  });
};
