import { Either } from 'effect';

import { EnumInvalidMemberError, EnumValueObject } from '../lib';

export const RoleType = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
  1: 1,
} as const;

class EnumRole extends EnumValueObject<EnumRole, typeof RoleType>(RoleType) {}

describe('Enum Value Object', () => {
  it('Should the class have the correct allowed values', () => {
    const allowedValues = Object.values(RoleType);
    expect(EnumRole.allowedValues).toEqual(allowedValues);
  });

  it('Should create a new EnumValueObject with string type', () => {
    const role = EnumRole.create(RoleType.ADMIN);
    expect(Either.isRight(role)).toBeTruthy();

    if (Either.isRight(role)) {
      const vo = role.right;
      expect(vo).toBeInstanceOf(EnumRole);
      expect(vo.value).toBe(RoleType.ADMIN);
    }
  });

  it('Should create a new EnumValueObject with number type', () => {
    const role = EnumRole.create(RoleType[1]);
    expect(Either.isRight(role)).toBeTruthy();

    if (Either.isRight(role)) {
      const vo = role.right;
      expect(vo).toBeInstanceOf(EnumRole);
      expect(vo.value).toBe(RoleType[1]);
    }
  });

  it('Should fail to create a new EnumValueObject', () => {
    const role = EnumRole.create('INVALID_ROLE' as keyof typeof RoleType);
    expect(Either.isLeft(role)).toBeTruthy();

    if (Either.isLeft(role)) {
      const error = role.left;
      expect(error).toBeInstanceOf(EnumInvalidMemberError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('ENUM_INVALID_MEMBER_ERROR');
      expect(error.data?.value).toBe('INVALID_ROLE');
    }
  });

  it('Should fail to create a new EnumValueObject with number type', () => {
    const role = EnumRole.create(2 as keyof typeof RoleType);
    expect(Either.isLeft(role)).toBeTruthy();

    if (Either.isLeft(role)) {
      const error = role.left;
      expect(error).toBeInstanceOf(EnumInvalidMemberError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('ENUM_INVALID_MEMBER_ERROR');
      expect(error.data?.value).toBe(2);
    }
  });

  it('Should have 1 validation function', () => {
    const validators = EnumRole.validationMap.get(EnumRole.KEY);
    const validatorsNames = validators?.map((validator) => validator.name);

    expect(validators?.length).toBe(1);
    expect(validatorsNames).toContain('enumContains');
  });
});
