import { Either } from 'effect';

import { UlidMalformedError, UlidValueObject, UuidMalformedError, UuidValueObject } from '../lib';

class UserUuid extends UuidValueObject<UserUuid>() {}

class UserUlid extends UlidValueObject<UserUlid>() {}

describe('Id Value Object', () => {
  /*
   * Uuid Value Object tests.
   */
  describe('Uuid', () => {
    it('Should create a valid Uuid with default function', () => {
      const result = UserUuid.create();

      expect(Either.isRight(result)).toBeTruthy();

      if (Either.isRight(result)) {
        const value = result.right;
        expect(value.value).toBeDefined();
        expect(value.value).toHaveLength(36);
      }
    });

    it('Should create a valid Uuid with the given value', () => {
      const result = UserUuid.create('123e4567-e89b-12d3-a456-426614174000');

      expect(Either.isRight(result)).toBeTruthy();

      if (Either.isRight(result)) {
        const value = result.right;
        expect(value.value).toBeDefined();
        expect(value.value).toHaveLength(36);
      }
    });

    it('Should fail to create a Uuid with an invalid format', () => {
      const result = UserUuid.create('bad-uuid');

      expect(Either.isLeft(result)).toBeTruthy();

      if (Either.isLeft(result)) {
        const error = result.left;
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(UuidMalformedError);
        expect(error.scope).toBe('VALUE_OBJECT_ERROR');
        expect(error.code).toBe('UUID_MALFORMED_ERROR');
        expect(error.data).toEqual({ value: 'bad-uuid', technique: 'uuid' });
      }
    });

    it('Should have a default value function and 1 validation', () => {
      const validators = UserUuid.validationMap.get(UserUuid.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('uuidValidator');
      expect(UserUuid.defaultValueFn).toBeDefined();
    });
  });

  describe('Ulid', () => {
    it('Should create a valid Ulid with default function', () => {
      const result = UserUlid.create();
      expect(Either.isRight(result)).toBeTruthy();

      if (Either.isRight(result)) {
        const value = result.right;
        expect(value.value).toBeDefined();
        expect(value.value).toHaveLength(26);
      }
    });

    it('Should create a valid Ulid with the given value', () => {
      const result = UserUlid.create('01E2X7ZJYK9KQZ5V9QZQXKJ3V8');

      expect(Either.isRight(result)).toBeTruthy();

      if (Either.isRight(result)) {
        const value = result.right;
        expect(value.value).toBeDefined();
        expect(value.value).toHaveLength(26);
        expect(value.value).toBe('01E2X7ZJYK9KQZ5V9QZQXKJ3V8');
      }
    });

    it('Should fail to create a Ulid with an invalid format', () => {
      const result = UserUlid.create('bad-ulid');

      expect(Either.isLeft(result)).toBeTruthy();

      if (Either.isLeft(result)) {
        const error = result.left;
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(UlidMalformedError);
        expect(error.scope).toBe('VALUE_OBJECT_ERROR');
        expect(error.code).toBe('ULID_MALFORMED_ERROR');
        expect(error.data).toEqual({ value: 'bad-ulid', technique: 'ulid' });
      }
    });

    it('Should have a default value function and 1 validation', () => {
      const validators = UserUlid.validationMap.get(UserUlid.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('ulidValidator');
      expect(UserUlid.defaultValueFn).toBeDefined();
    });
  });
});
