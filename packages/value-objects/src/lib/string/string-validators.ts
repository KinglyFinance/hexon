import { type Either } from 'effect';
import z from 'zod';

import { E } from '@hexon/common';

import {
  StringEndsWithError,
  StringIncludesError,
  StringLengthError,
  StringMaxLengthError,
  StringMinLengthError,
  StringRegexError,
  StringStartsWithError,
} from './string-errors';

/**
 * Validates the length of a string.
 *
 * @param value - The string to validate.
 * @param length - The length to validate.
 * @returns If the validation fails, it returns a `StringLengthError`, otherwise it returns `true`.
 */
export const stringLengthValidator = (
  value: string,
  length: number,
): Either.Either<boolean, StringLengthError> =>
  E.toPredicate({
    predicate: () => z.string().length(length).safeParse(value).success,
    error: new StringLengthError({
      message: `The length must be ${length}: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates the minimum length of a string.
 *
 * @param value - The string to validate.
 * @param min - The minimum length to validate.
 * @returns If the validation fails, it returns a `StringLengthError`, otherwise it returns `true`.
 */
export const stringMinLengthValidator = (
  value: string,
  min: number,
): Either.Either<boolean, StringMinLengthError> =>
  E.toPredicate({
    predicate: () => z.string().min(min).safeParse(value).success,
    error: new StringMinLengthError({
      message: `The minimum length must be ${min}: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates the maximum length of a string.
 *
 * @param value - The string to validate.
 * @param max - The maximum length to validate.
 * @returns If the validation fails, it returns a `StringMaxLengthError`, otherwise it returns `true`.
 */
export const stringMaxLengthValidator = (
  value: string,
  max: number,
): Either.Either<boolean, StringMaxLengthError> =>
  E.toPredicate({
    predicate: () => z.string().max(max).safeParse(value).success,
    error: new StringMaxLengthError({
      message: `The maximum length must be ${max}: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates a string with a regex.
 *
 * @param value - The string to validate.
 * @param regex - The regex to validate.
 * @returns If the validation fails, it returns a `StringRegexError`, otherwise it returns `true`.
 */
export const stringRegexValidator = (
  value: string,
  regex: RegExp,
): Either.Either<boolean, StringRegexError> =>
  E.toPredicate({
    predicate: () => z.string().regex(regex).safeParse(value).success,
    error: new StringRegexError({
      message: `Invalid regex for string: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates a string that starts with a specific string.
 *
 * @param value - The string to validate.
 * @param start - String that the value should start with.
 * @returns If the validation fails, it returns a `StringStartsWithError`, otherwise it returns `true`.
 */
export const stringStartsWithValidator = (
  value: string,
  start: string,
): Either.Either<boolean, StringStartsWithError> =>
  E.toPredicate({
    predicate: () => z.string().startsWith(start).safeParse(value).success,
    error: new StringStartsWithError({
      message: `It must start with: ${start}: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates a string that ends with a specific string.
 *
 * @param value - The string to validate.
 * @param end - String that the value should end with.
 * @returns If the validation fails, it returns a `StringEndsWithError`, otherwise it returns `true`.
 */
export const stringEndsWithValidator = (
  value: string,
  end: string,
): Either.Either<boolean, StringEndsWithError> =>
  E.toPredicate({
    predicate: () => z.string().endsWith(end).safeParse(value).success,
    error: new StringEndsWithError({
      message: `It must end with: ${end}: ${value}`,
      data: { value },
    }),
  });

/**
 * Validates a string that includes a specific string.
 *
 * @param value - The string to validate.
 * @param includes - String that the value should include.
 * @returns If the validation fails, it returns a `StringIncludesError`, otherwise it returns `true`.
 */
export const stringIncludesValidator = (
  value: string,
  includes: string,
): Either.Either<boolean, StringIncludesError> =>
  E.toPredicate({
    predicate: () => z.string().includes(includes).safeParse(value).success,
    error: new StringIncludesError({
      message: `It must include: ${includes}: ${value}`,
      data: { value },
    }),
  });
