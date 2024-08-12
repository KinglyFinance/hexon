import { Either } from 'effect';

import {
  StringMaxLength,
  StringMaxLengthError,
  StringMinLength,
  StringMinLengthError,
  StringRegex,
  StringRegexError,
  StringValueObject,
} from '../lib';

@StringMinLength(5)
@StringMaxLength(15)
@StringRegex(/^[a-zA-Zà-ÿ'. -]+$/)
class UserName extends StringValueObject<
  UserName,
  StringMinLengthError | StringMaxLengthError | StringRegexError
>() {}

describe('String Value Object', () => {
  it('Should create a valid UserName', () => {
    const result = UserName.create('Bob Smith');

    expect(Either.isRight(result)).toBe(true);

    if (Either.isRight(result)) {
      const username = result.right;
      expect(username).toBeInstanceOf(UserName);
      expect(username.value).toBe('Bob Smith');
    }
  });

  it('Should not create a UserName with less than 5 characters', () => {
    const result = UserName.create('Bol');

    expect(Either.isLeft(result)).toBe(true);

    if (Either.isLeft(result)) {
      const error = result.left;
      expect(error).toBeInstanceOf(StringMinLengthError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('STRING_MIN_LENGTH_ERROR');
      expect(error.message).toBeTruthy();
      expect(error.data).toEqual({ value: 'Bol' });
    }
  });

  it('Should not create a UserName with more than 15 characters', () => {
    const result = UserName.create('Bob Smith Jr. III');

    expect(Either.isLeft(result)).toBe(true);

    if (Either.isLeft(result)) {
      const error = result.left;
      expect(error).toBeInstanceOf(StringMaxLengthError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('STRING_MAX_LENGTH_ERROR');
      expect(error.message).toBeTruthy();
      expect(error.data).toEqual({ value: 'Bob Smith Jr. III' });
    }
  });

  it('Should not create a UserName with invalid characters', () => {
    const result = UserName.create('Bob Smith!');

    expect(Either.isLeft(result)).toBe(true);

    if (Either.isLeft(result)) {
      const error = result.left;
      expect(error).toBeInstanceOf(StringRegexError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('STRING_REGEX_ERROR');
      expect(error.message).toBeTruthy();
      expect(error.data).toEqual({ value: 'Bob Smith!' });
    }
  });

  it('Should not create a UserName with invalid characters and less than 5 characters', () => {
    const result = UserName.create('Bo!');

    expect(Either.isLeft(result)).toBe(true);

    if (Either.isLeft(result)) {
      const error = result.left;
      expect(error).toBeInstanceOf(StringRegexError);
      expect(error.scope).toBe('VALUE_OBJECT_ERROR');
      expect(error.code).toBe('STRING_REGEX_ERROR');
      expect(error.message).toBeTruthy();
      expect(error.data).toEqual({ value: 'Bo!' });
    }
  });

  it('Should the UserName class have 3 validators', () => {
    const validators = UserName.validationMap.get(UserName.KEY);
    const validatorsNames = validators?.map((validator) => validator.name);

    expect(validators).toHaveLength(3);
    expect(validatorsNames).toContain('regex');
    expect(validatorsNames).toContain('minLength');
    expect(validatorsNames).toContain('maxLength');
  });

  it('Should the UserName class have no default value function', () => {
    expect(UserName.defaultValueFn).toBeNull();
  });
});
