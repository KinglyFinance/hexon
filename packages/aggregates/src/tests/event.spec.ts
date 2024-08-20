import { Either, pipe } from 'effect';

import { UserEvent, createUser } from './common';

describe('Event', () => {
  it('Should create an event with the given code and data', () => {
    const createEvent = pipe(
      createUser('John Doe', ['ADMIN', 'USER']),
      Either.map(
        ({ id, name, roles }) =>
          new UserEvent('USER_CREATED_EVENT', {
            id: id.value,
            name: name.value,
            roles: roles.map((role) => role.value),
          }),
      ),
    );

    expect(Either.isRight(createEvent)).toBeTruthy();

    if (Either.isRight(createEvent)) {
      const event = createEvent.right;

      expect(event.code).toBe('USER_CREATED_EVENT');
      expect(event.name).toBe('UserCreatedEvent');
      expect(event.payload.id).toBeDefined();
      expect(event.payload.name).toBe('John Doe');
      expect(event.payload.roles).toEqual(['ADMIN', 'USER']);
      expect(event.toString()).toBe(
        JSON.stringify({
          uuid: event.uuid,
          timestamp: event.timestamp,
          name: 'UserCreatedEvent',
          code: 'USER_CREATED_EVENT',
          payload: {
            id: event.payload.id,
            name: 'John Doe',
            roles: ['ADMIN', 'USER'],
          },
        }),
      );
    }
  });

  it('Should create an event with the given other code and data', () => {
    const createEvent = pipe(
      createUser('John Doe', ['ADMIN', 'USER']),
      Either.map(
        ({ id, name, roles }) =>
          new UserEvent('USER_DELETED_EVENT', {
            id: id.value,
            name: name.value,
            roles: roles.map((role) => role.value),
          }),
      ),
    );

    expect(Either.isRight(createEvent)).toBeTruthy();

    if (Either.isRight(createEvent)) {
      const event = createEvent.right;

      expect(event.code).toBe('USER_DELETED_EVENT');
      expect(event.name).toBe('UserDeletedEvent');
      expect(event.payload.id).toBeDefined();
      expect(event.payload.name).toBe('John Doe');
      expect(event.payload.roles).toEqual(['ADMIN', 'USER']);
      expect(event.toString()).toBe(
        JSON.stringify({
          uuid: event.uuid,
          timestamp: event.timestamp,
          name: 'UserDeletedEvent',
          code: 'USER_DELETED_EVENT',
          payload: {
            id: event.payload.id,
            name: 'John Doe',
            roles: ['ADMIN', 'USER'],
          },
        }),
      );
    }
  });
});
