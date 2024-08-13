import { type ValueObjectType } from '../value-object-type';
import {
  numberIntegerValidator,
  numberMaxValidator,
  numberMinValidator,
  numberNegativeValidator,
  numberPositiveValidator,
  numberRangeValidator,
} from './number-validators';

/**
 * Decorator that adds a validation to check if a number exceeds the maximum value.
 *
 * @param max - The maximum value to validate.
 * @returns The decorator function.
 */
export function NumberMax(max: number) {
  return function (target: ValueObjectType) {
    const maxValidator = (value: number) => numberMaxValidator(value, max);
    target.addValidation(maxValidator);
  };
}

/**
 * Decorator that adds a validation to check if a number is below the minimum value.
 *
 * @param min - The minimum value to validate.
 * @returns The decorator function.
 */
export function NumberMin(min: number) {
  return function (target: ValueObjectType) {
    const minValidator = (value: number) => numberMinValidator(value, min);
    target.addValidation(minValidator);
  };
}

/**
 * Decorator that adds a validation to check if a number is an integer.
 *
 * @returns The decorator function.
 */
export function NumberInteger() {
  return function (target: ValueObjectType) {
    const integerValidator = (value: number) => numberIntegerValidator(value);
    target.addValidation(integerValidator);
  };
}

/**
 * Decorator that adds a validation to check if a number is positive.
 *
 * @returns The decorator function.
 */
export function NumberPositive() {
  return function (target: ValueObjectType) {
    const positiveValidator = (value: number) => numberPositiveValidator(value);
    target.addValidation(positiveValidator);
  };
}

/**
 * Decorator that adds a validation to check if a number is negative.
 *
 * @returns The decorator function.
 */
export function NumberNegative() {
  return function (target: ValueObjectType) {
    const negativeValidator = (value: number) => numberNegativeValidator(value);
    target.addValidation(negativeValidator);
  };
}

/**
 * Decorator that adds a validation to check if a number is in a range.
 *
 * @param min - The minimum value to validate.
 * @param max - The maximum value to validate.
 * @returns The decorator function.
 */
export function NumberRange(min: number, max: number) {
  return function (target: ValueObjectType) {
    const rangeValidator = (value: number) => numberRangeValidator(value, min, max);
    target.addValidation(rangeValidator);
  };
}
