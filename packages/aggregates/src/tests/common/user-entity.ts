import { Either, pipe } from 'effect';

import '@hexon/value-objects';
import {
  EnumValueObject,
  StringMinLength,
  type StringMinLengthError,
  StringValueObject,
  UuidValueObject,
} from '@hexon/value-objects';

import { Entity } from '../../lib';

class UserId extends UuidValueObject<UserId>() {}

@StringMinLength(3)
class UserName extends StringValueObject<UserName, StringMinLengthError>() {}

const UserRoleEnum = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  SALES: 'SALES',
} as const;

type UserRoleEnum = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

class UserRole extends EnumValueObject<UserRole, typeof UserRoleEnum>(UserRoleEnum) {}

type UserProps = {
  id: UserId;
  name: UserName;
  roles: UserRole[];
};

class User extends Entity<UserProps> {
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get roles() {
    return this.props.roles;
  }
}

const createUser = (name: string, roles: (keyof typeof UserRoleEnum)[]) => {
  return pipe(
    Either.Do,
    Either.bind('id', () => UserId.create()),
    Either.bind('name', () => UserName.create(name)),
    Either.bind('roles', () => Either.all(roles.map((role) => UserRole.create(role)))),
    Either.map(({ id, name, roles }) => new User({ id, name, roles })),
  );
};

export { createUser, User, UserId, UserName, UserRole, UserRoleEnum };
