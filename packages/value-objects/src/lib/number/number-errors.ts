import { ErrorFactory } from '@hexon/errors';

/**
 * Error mapper for number errors.
 */
const NumberErrorMapper = {
  NUMBER_EXCEEDS_MAXIMUM_ERROR: 'VALUE_OBJECT_ERROR',
  NUMBER_BELOW_MINIMUM_ERROR: 'VALUE_OBJECT_ERROR',
  NUMBER_NOT_INTEGER_ERROR: 'VALUE_OBJECT_ERROR',
  NUMBER_NEGATIVE_ERROR: 'VALUE_OBJECT_ERROR',
  NUMBER_POSITIVE_ERROR: 'VALUE_OBJECT_ERROR',
  NUMBER_NOT_IN_RANGE_ERROR: 'VALUE_OBJECT_ERROR',
} as const;

/**
 * Data for number errors.
 */
type NumberErrorData = {
  value: number;
};

/**
 * Factory for number errors.
 */
const NumberErrorFactory = ErrorFactory<typeof NumberErrorMapper, NumberErrorData>(
  NumberErrorMapper,
);

/**
 * Number error when the number exceeds the maximum value.
 */
class NumberExceedsMaximumError extends NumberErrorFactory('NUMBER_EXCEEDS_MAXIMUM_ERROR') {}

/**
 * Number error when the number is below the minimum value.
 */
class NumberBelowMinimumError extends NumberErrorFactory('NUMBER_BELOW_MINIMUM_ERROR') {}

/**
 * Number error when the number is not an integer.
 */
class NumberNotIntegerError extends NumberErrorFactory('NUMBER_NOT_INTEGER_ERROR') {}

/**
 * Number error when the number is negative.
 */
class NumberNegativeError extends NumberErrorFactory('NUMBER_NEGATIVE_ERROR') {}

/**
 * Number error when the number is positive.
 */
class NumberPositiveError extends NumberErrorFactory('NUMBER_POSITIVE_ERROR') {}

/**
 * Number error when the number is not in the expected range.
 */
class NumberNotInRangeError extends NumberErrorFactory('NUMBER_NOT_IN_RANGE_ERROR') {}

/**
 * Contains all possible number errors.
 */
type NumberError =
  | NumberExceedsMaximumError
  | NumberBelowMinimumError
  | NumberNotIntegerError
  | NumberNegativeError
  | NumberPositiveError
  | NumberNotInRangeError;

export {
  NumberBelowMinimumError,
  NumberExceedsMaximumError,
  NumberNegativeError,
  NumberNotInRangeError,
  NumberNotIntegerError,
  NumberPositiveError,
  type NumberError,
};
