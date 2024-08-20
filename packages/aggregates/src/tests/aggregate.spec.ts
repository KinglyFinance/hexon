import { Effect, Either } from 'effect';

import { UserAggregate } from './common';

describe('Aggregate', () => {
  it('Should create successfully an aggregate', () => {
    const createUserAggregate = UserAggregate.create('John Doe', ['ADMIN', 'USER']);
    const result = Effect.runSync(createUserAggregate);

    expect(Either.isRight(result)).toBeTruthy();

    if (Either.isRight(result)) {
      const user = result.right;
      expect(user.events).toHaveLength(1);
      expect(user.events[0].code).toBe('USER_CREATED_EVENT');
      expect(user.events[0].name).toBe('UserCreatedEvent');
      expect(user.events[0].uuid).toBeDefined();
      expect(user.events[0].timestamp).toBeDefined();
      expect(user.events[0].payload.id).toBeUndefined();
      expect(user.events[0].payload.name).toEqual('John Doe');
      expect(user.events[0].payload.roles).toBeUndefined();
      expect(user.primitives.id).toBeDefined();
      expect(user.primitives.name).toBe('John Doe');
      expect(user.primitives.roles).toEqual(['ADMIN', 'USER']);

      // Pulling events.
      const events = user.pullEvents();
      expect(events).toHaveLength(1);
      expect(events[0].code).toBe('USER_CREATED_EVENT');
      expect(events[0].name).toBe('UserCreatedEvent');
      expect(events[0].uuid).toBeDefined();
      expect(events[0].timestamp).toBeDefined();
      expect(events[0].payload.id).toBeUndefined();
      expect(events[0].payload.name).toEqual('John Doe');
      expect(events[0].payload.roles).toBeUndefined();

      // Aggregate event should be empty.
      expect(user.events).toHaveLength(0);
    }
  });
});
