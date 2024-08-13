import { type ValueObjectType } from '../value-object-type';
import {
  dateInRangeValidator,
  dateIsAfterValidator,
  dateIsBeforeValidator,
  dateIsFutureValidator,
  dateIsPastValidator,
  dateIsValidValidator,
  dateIsWeekdayValidator,
  dateIsWeekendValidator,
  dateMaxAgeValidator,
} from './date-validators';

/**
 * Decorator that adds a validation to check if a date is valid.
 *
 * @returns The decorator function.
 */
export function DateValid() {
  return function (target: ValueObjectType) {
    const validValidator = (value: Date) => dateIsValidValidator(value);
    target.addValidation(validValidator);
  };
}

/**
 * Decorator that adds a validation to check if a date is in the past.
 *
 * @returns The decorator function.
 */
export const DatePast = () => {
  return function (target: ValueObjectType) {
    const pastValidator = (value: Date) => dateIsPastValidator(value);
    target.addValidation(pastValidator);
  };
};

/**
 * Decorator that adds a validation to check if a date is in the future.
 *
 * @returns The decorator function.
 */
export const DateFuture = () => {
  return function (target: ValueObjectType) {
    const futureValidator = (value: Date) => dateIsFutureValidator(value);
    target.addValidation(futureValidator);
  };
};

/**
 * Decorator that adds a validation to check if a date is before the expected date.
 *
 * @param expected - The expected date to validate.
 * @returns The decorator function.
 */
export const DateBefore = (expected: Date) => {
  return function (target: ValueObjectType) {
    const beforeValidator = (value: Date) => dateIsBeforeValidator(value, expected);
    target.addValidation(beforeValidator);
  };
};

/**
 * Decorator that adds a validation to check if a date is after the expected date.
 *
 * @param expected - The expected date to validate.
 * @returns The decorator function.
 */
export const DateAfter = (expected: Date) => {
  return function (target: ValueObjectType) {
    const afterValidator = (value: Date) => dateIsAfterValidator(value, expected);
    target.addValidation(afterValidator);
  };
};

/**
 * Decorator that adds a validation to check if a date is older than the expected age.
 *
 * @param age - The maximum age to validate.
 * @returns The decorator function.
 */
export const DateMaxAge = (age: number) => {
  return function (target: ValueObjectType) {
    const maxAgeValidator = (value: Date) => dateMaxAgeValidator(value, age);
    target.addValidation(maxAgeValidator);
  };
};

/**
 * Decorator that adds a validation to check if a date is in the expected range.
 *
 * @param min - The minimum value to validate.
 * @param max - The maximum value to validate.
 * @returns The decorator function.
 */
export const DateInRange = (min: Date, max: Date) => {
  return function (target: ValueObjectType) {
    const inRangeValidator = (value: Date) => dateInRangeValidator(value, min, max);
    target.addValidation(inRangeValidator);
  };
};

/**
 * Decorator that adds a validation to check if a date is a weekday.
 *
 * @returns The decorator function.
 */
export const DateWeekday = () => {
  return function (target: ValueObjectType) {
    const weekdayValidator = (value: Date) => dateIsWeekdayValidator(value);
    target.addValidation(weekdayValidator);
  };
};

/**
 * Decorator that adds a validation to check if a date is a weekend.
 *
 * @returns The decorator function.
 */
export const DateWeekend = () => {
  return function (target: ValueObjectType) {
    const weekendValidator = (value: Date) => dateIsWeekendValidator(value);
    target.addValidation(weekendValidator);
  };
};
