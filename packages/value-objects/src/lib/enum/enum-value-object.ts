import { type PrimitiveValue } from '@hexon/common';

import { ValueObjectFactory } from '../value-object-factory';
import { type ValueObjectType } from '../value-object-type';
import { EnumContains } from './enum-decorators';
import { type EnumError } from './enum-errors';

/**
 * Allowed key types for an enum key.
 */
export type EnumKeyType = string | number;

/**
 * Type for an enum.
 */
export type EnumType = Record<EnumKeyType, PrimitiveValue>;

/**
 * Factory for Enum value objects.
 *
 * @returns An enum value object factory class to be extended.
 */
const EnumValueObjectFactory = <T, V extends EnumKeyType, E extends EnumError>() =>
  ValueObjectFactory<T, V, E>();

/**
 * Represents an enum value object type with his attributes.
 */
export type EnumValueObjectType = ValueObjectType & {
  allowedValues: PrimitiveValue[];
};

/**
 * Value object that stores an enum. It contains out-of-the-box validation.
 *
 * @param enumDefinition - The enum definition to be used.
 * @returns An enum value object class to be extended.
 *
 * @example
 * ```ts
 * const MyEnum = {
 *  A: 'A',
 *  B: 'B',
 *  C: 'C',
 * } as const;
 *
 * const MyEnumValueObject = EnumValueObject<MyEnumValueObject, typeof MyEnum>(MyEnum) {}
 *
 * // A valid enum value object.
 * const myEnum = MyEnumValueObject.create(MyEnum.A);
 *
 * // An invalid enum value object.
 * const myEnum = MyEnumValueObject.create('INVALID');
 * ```
 */
export const EnumValueObject = <
  T,
  L extends EnumType,
  K extends EnumKeyType = keyof L extends EnumKeyType ? keyof L : never,
>(
  enumDefinition: L,
) => {
  @EnumContains()
  class EnumValueObject extends EnumValueObjectFactory<T, K, EnumError>() {
    static readonly allowedValues = Object.values(enumDefinition);
  }
  return EnumValueObject;
};
