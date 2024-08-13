import { enumContainsValidator } from './enum-validators';
import type { EnumKeyType, EnumValueObjectType } from './enum-value-object';

/**
 * Decorator that adds a validation to check if the value is in the allowed values of the enum.
 */
export function EnumContains() {
  return function (target: EnumValueObjectType) {
    const enumContains = (value: EnumKeyType) => enumContainsValidator(value, target.allowedValues);
    target.addValidation(enumContains);
  };
}
