import { Either } from 'effect';

import { ErrorClass } from '../lib/error-class';
import {
  StringMaxLengthError,
  StringMinLengthError,
  StringOnlyNumbersError,
  stringValidationPipe,
} from './utils';

describe('Error', () => {
  it('Should create a new error class with the given type and code configuration', () => {
    const error = new StringOnlyNumbersError({
      message: 'A random message',
      data: { value: 'A test value' },
    });

    expect(error).toBeInstanceOf(ErrorClass);
    expect(error).toBeInstanceOf(StringOnlyNumbersError);
    expect(error.scope).toBe('VALUE_OBJECT_ERROR');
    expect(error.code).toBe('STRING_ONLY_NUMBERS_ERROR');
    expect(error.name).toBe(StringOnlyNumbersError.name);
    expect(error.message).toBe('A random message');
    expect(error.data).toEqual({ value: 'A test value' });
  });

  it('Should propagate the errors correctly through Either pipelines', () => {
    const invalidRegexError = stringValidationPipe('123z56', 5, 10);
    const minLengthError = stringValidationPipe('1234', 5, 10);
    const maxLengthError = stringValidationPipe('123456784928475969', 5, 10);
    const validString = stringValidationPipe('123456', 5, 10);

    // First pipeline error.
    expect(Either.isLeft(invalidRegexError)).toEqual(true);
    if (Either.isLeft(invalidRegexError)) {
      const error = invalidRegexError.left;
      expect(error).toBeInstanceOf(StringOnlyNumbersError);
      expect(error.code).toEqual('STRING_ONLY_NUMBERS_ERROR');
    }

    // Second pipeline error.
    expect(Either.isLeft(minLengthError)).toEqual(true);
    if (Either.isLeft(minLengthError)) {
      const error = minLengthError.left;
      expect(error).toBeInstanceOf(StringMinLengthError);
      expect(error.code).toEqual('STRING_MIN_LENGTH_ERROR');
    }

    // Third pipeline error.
    expect(Either.isLeft(maxLengthError)).toEqual(true);
    if (Either.isLeft(maxLengthError)) {
      const error = maxLengthError.left;
      expect(error).toBeInstanceOf(StringMaxLengthError);
      expect(error.code).toEqual('STRING_MAX_LENGTH_ERROR');
    }

    // Valid string.
    expect(Either.isRight(validString)).toEqual(true);
    if (Either.isRight(validString)) {
      expect(validString.right).toEqual(true);
    }
  });
});
