import { Effect, Either } from 'effect';

import { AggregateRoot } from '../../lib';
import { type UserProps, type UserRoleEnum, createUser } from './user-entity';
import { type UserEventCode } from './user-event';

export class UserAggregate extends AggregateRoot<UserProps, UserEventCode> {
  public static create(name: string, roles: (keyof typeof UserRoleEnum)[]) {
    return Effect.either(
      Either.Do.pipe(
        Effect.bind('userEntity', () => createUser(name, roles)),
        Effect.andThen(
          ({ userEntity: { id, name, roles } }) => new UserAggregate({ id, name, roles }),
        ),
        Effect.tap((userAggregate) => userAggregate.addEvent('USER_CREATED_EVENT', ['name'])),
        Effect.map((userAggregate) => userAggregate),
      ),
    );
  }
}
