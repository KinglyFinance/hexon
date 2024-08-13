import { ErrorFactory } from '@hexon/errors';

/**
 * Error mapper for date errors.
 */
const DateErrorMapper = {
  DATE_INVALID_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_PAST_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_FUTURE_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_BEFORE_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_AFTER_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_MAX_AGE_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_NOT_IN_RANGE_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_NOT_WEEKDAY_ERROR: 'VALUE_OBJECT_ERROR',
  DATE_NOT_WEEKEND_ERROR: 'VALUE_OBJECT_ERROR',
} as const;

/**
 * Data for date errors.
 */
type DateErrorData = {
  value: Date;
};

/**
 * Factory for date errors.
 */
const DateErrorFactory = ErrorFactory<typeof DateErrorMapper, DateErrorData>(DateErrorMapper);

/**
 * Date error when the date is invalid.
 */
class DateInvalidError extends DateErrorFactory('DATE_INVALID_ERROR') {}

/**
 * Date error when the date is in the past.
 */
class DatePastError extends DateErrorFactory('DATE_PAST_ERROR') {}

/**
 * Date error when the date is in the future.
 */
class DateFutureError extends DateErrorFactory('DATE_FUTURE_ERROR') {}

/**
 * Date error when the date is before the expected date.
 */
class DateBeforeError extends DateErrorFactory('DATE_BEFORE_ERROR') {}

/**
 * Date error when the date is after the expected date.
 */
class DateAfterError extends DateErrorFactory('DATE_AFTER_ERROR') {}

/**
 * Date error when the date is older than the expected age.
 */
class DateMaxAgeError extends DateErrorFactory('DATE_MAX_AGE_ERROR') {}

/**
 * Date error when the date is not in the expected range.
 */
class DateNotInRangeError extends DateErrorFactory('DATE_NOT_IN_RANGE_ERROR') {}

/**
 * Date error when the date is not a weekday.
 */
class DateNotWeekdayError extends DateErrorFactory('DATE_NOT_WEEKDAY_ERROR') {}

/**
 * Date error when the date is not a weekend.
 */
class DateNotWeekendError extends DateErrorFactory('DATE_NOT_WEEKEND_ERROR') {}

/**
 * Contains all possible date errors.
 */
type DateError =
  | DateInvalidError
  | DatePastError
  | DateFutureError
  | DateBeforeError
  | DateAfterError
  | DateMaxAgeError
  | DateNotInRangeError
  | DateNotWeekdayError
  | DateNotWeekendError;

export {
  DateAfterError,
  DateBeforeError,
  DateFutureError,
  DateInvalidError,
  DateMaxAgeError,
  DateNotInRangeError,
  DateNotWeekdayError,
  DateNotWeekendError,
  DatePastError,
  type DateError,
};
