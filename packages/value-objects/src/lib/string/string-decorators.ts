import { type ValueObjectType } from '../value-object-type';
import {
  stringEndsWithValidator,
  stringIncludesValidator,
  stringLengthValidator,
  stringMaxLengthValidator,
  stringMinLengthValidator,
  stringRegexValidator,
  stringStartsWithValidator,
} from './string-validators';

/**
 * Decorator that adds a validation to check the length of a string.
 *
 * @param length - The length to validate.
 * @returns The decorator function.
 */
export function StringLength(length: number) {
  return function (target: ValueObjectType) {
    const len = (value: string) => stringLengthValidator(value, length);
    target.addValidation(len);
  };
}

/**
 * Decorator that adds a validation to check the minimum length of a string.
 *
 * @param min - The minimum length to validate.
 * @returns The decorator function.
 */
export function StringMinLength(min: number) {
  return function (target: ValueObjectType) {
    const minLength = (value: string) => stringMinLengthValidator(value, min);
    target.addValidation(minLength);
  };
}

/**
 * Decorator that adds a validation to check the maximum length of a string.
 *
 * @param max - The maximum length to validate.
 * @returns The decorator function.
 */
export function StringMaxLength(max: number) {
  return function (target: ValueObjectType) {
    const maxLength = (value: string) => stringMaxLengthValidator(value, max);
    target.addValidation(maxLength);
  };
}

/**
 * Decorator that adds a validation to check the regex of a string.
 *
 * @param regex - The regex to validate.
 * @returns The decorator function.
 */
export function StringRegex(regexp: RegExp) {
  return function (target: ValueObjectType) {
    const regex = (value: string) => stringRegexValidator(value, regexp);
    target.addValidation(regex);
  };
}

/**
 * Decorator that adds a validation to check if a string starts with a specific string.
 *
 * @param start - The string to validate.
 * @returns The decorator function.
 */
export function StringStartsWithRegex(start: string) {
  return function (target: ValueObjectType) {
    const startsWith = (value: string) => stringStartsWithValidator(value, start);
    target.addValidation(startsWith);
  };
}

/**
 * Decorator that adds a validation to check if a string ends with a specific string.
 *
 * @param end - The string to validate.
 * @returns The decorator function.
 */
export function StringEndsWithValidator(end: string) {
  return function (target: ValueObjectType) {
    const endsWith = (value: string) => stringEndsWithValidator(value, end);
    target.addValidation(endsWith);
  };
}

/**
 * Decorator that adds a validation to check if a string includes a specific string.
 *
 * @param includes - The string to validate.
 * @returns The decorator function.
 */
export function StringIncludesValidator(inc: string) {
  return function (target: ValueObjectType) {
    const includes = (value: string) => stringIncludesValidator(value, inc);
    target.addValidation(includes);
  };
}
