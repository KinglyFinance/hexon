import { Either } from 'effect';

import { EnumInvalidMemberError, StringMinLengthError } from '@hexon/value-objects';

import { User, UserId, UserName, type UserRole, type UserRoleEnum, createUser } from './common';

describe('Entity', () => {
  it('Should create a user and have his primitives', () => {
    const result = createUser('John Doe', ['ADMIN', 'SALES']);

    expect(Either.isRight(result)).toBe(true);

    if (Either.isRight(result)) {
      const user = result.right;
      expect(user).toBeInstanceOf(User);
      expect(user.id).toBeInstanceOf(UserId);
      expect(user.name).toBeInstanceOf(UserName);
      expect(user.roles).toHaveLength(2);
      expect(user.roles).toBeInstanceOf(Array<UserRole>);
      expect(user.roles[0].value).toBe('ADMIN');
      expect(user.roles[1].value).toBe('SALES');
      expect(user.primitives.id).toBe(user.id.value);
      expect(user.primitives.name).toBe(user.name.value);
      expect(user.roles).toHaveLength(user.primitives.roles.length);
      expect(user.primitives.roles).toEqual(user.roles.map((role) => role.value));
    }
  });

  it('Should fail to create a user with invalid name', () => {
    const result = createUser('Jo', ['ADMIN', 'SALES']);

    expect(Either.isLeft(result)).toBe(true);

    if (Either.isLeft(result)) {
      const error = result.left;
      expect(error).toBeInstanceOf(StringMinLengthError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('STRING_MIN_LENGTH_ERROR');
      expect(error.data?.value).toBe('Jo');
    }
  });

  it('Should fail to create a user with invalid roles', () => {
    const result = createUser('John Doe', ['ADMIN', 'INVALID_ROLE' as UserRoleEnum]);

    expect(Either.isLeft(result)).toBe(true);

    if (Either.isLeft(result)) {
      const error = result.left;
      expect(error).toBeInstanceOf(EnumInvalidMemberError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('ENUM_INVALID_MEMBER_ERROR');
      expect(error.data?.value).toBe('INVALID_ROLE');
    }
  });
});
