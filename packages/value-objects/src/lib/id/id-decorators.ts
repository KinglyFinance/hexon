import { DefaultValueFn } from '../value-object-default-decorator';
import { type ValueObjectType } from '../value-object-type';
import { nanoIdDefault, ulidDefault, uuidDefault } from './id-defaults';
import { nanoIdFormatValidator, ulidFormatValidator, uuidFormatValidator } from './id-validators';

/**
 * Decorator that sets the default value function of a UUID.
 */
export const Uuid = () => DefaultValueFn(uuidDefault);

/**
 * Decorator that adds a validation to check the format of a UUID.
 */
export function UuidFormatValidator() {
  return function (target: ValueObjectType) {
    const uuidValidator = (value: string) => uuidFormatValidator(value);
    target.addValidation(uuidValidator);
  };
}

/**
 * Decorator that sets the default value function of a ULID.
 */
export const Ulid = () => DefaultValueFn(ulidDefault);

/**
 * Decorator that adds a validation to check the format of a ULID.
 */
export function UlidFormatValidator() {
  return function (target: ValueObjectType) {
    const ulidValidator = (value: string) => ulidFormatValidator(value);
    target.addValidation(ulidValidator);
  };
}

/**
 * Decorator that sets the default value function of a nanoid.
 */
export const NanoId = () => DefaultValueFn(nanoIdDefault);

/**
 * Decorator that adds a validation to check the format of a nanoid.
 */
export function NanoIdFormatValidator() {
  return function (target: ValueObjectType) {
    const nanoIdValidator = (value: string) => nanoIdFormatValidator(value);
    target.addValidation(nanoIdValidator);
  };
}
