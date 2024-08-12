import { ErrorFactory } from '@hexon/errors';

/**
 * Error mapper for string errors.
 */
const StringErrorMapper = {
  STRING_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_MIN_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_MAX_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_STARTS_WITH_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_ENDS_WITH_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_INCLUDES_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_REGEX_ERROR: 'VALUE_OBJECT_ERROR',
} as const;

/**
 * Data for string errors.
 */
type StringErrorData = {
  value: string;
};

/**
 * Factory for string errors.
 */
const StringErrorFactory = ErrorFactory<typeof StringErrorMapper, StringErrorData>(
  StringErrorMapper,
);

/**
 * String error when the string length is not valid.
 */
class StringLengthError extends StringErrorFactory('STRING_LENGTH_ERROR') {}

/**
 * String error when the string length is less than the minimum length.
 */
class StringMinLengthError extends StringErrorFactory('STRING_MIN_LENGTH_ERROR') {}

/**
 * String error when the string length is greater than the maximum length.
 */
class StringMaxLengthError extends StringErrorFactory('STRING_MAX_LENGTH_ERROR') {}

/**
 * String error when the string does not start with the expected value.
 */
class StringStartsWithError extends StringErrorFactory('STRING_STARTS_WITH_ERROR') {}

/**
 * String error when the string does not match the regex.
 */
class StringEndsWithError extends StringErrorFactory('STRING_ENDS_WITH_ERROR') {}

/**
 * String error when the string does not contain the expected a substring.
 */
class StringIncludesError extends StringErrorFactory('STRING_INCLUDES_ERROR') {}

/**
 * String error when the string does not match the regex.
 */
class StringRegexError extends StringErrorFactory('STRING_REGEX_ERROR') {}

/**
 * Contains all the possible string errors.
 */
type StringError =
  | StringLengthError
  | StringMaxLengthError
  | StringMinLengthError
  | StringStartsWithError
  | StringEndsWithError
  | StringIncludesError
  | StringRegexError;

export {
  StringEndsWithError,
  StringIncludesError,
  StringLengthError,
  StringMaxLengthError,
  StringMinLengthError,
  StringRegexError,
  StringStartsWithError,
  type StringError,
};
