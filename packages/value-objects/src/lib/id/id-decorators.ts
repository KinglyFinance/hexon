import { DefaultValueFn } from '../value-object-default-decorator';
import { type ValueObjectType } from '../value-object-type';
import { uuidDefault } from './id-defaults';
import { uuidFormatValidator } from './id-validators';

/**
 * Decorator that sets the default value of a UUID.
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
