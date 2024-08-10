import { Either, pipe } from 'effect';
import z from 'zod';

import { errorFactory } from '../lib';

const StringErrorCode = {
  STRING_NOT_ONLY_NUMBERS_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_MIN_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_MAX_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
} as const;

type StringErrorData = {
  value: string;
};

const { Decorator: StringError, Error: StringErrorClass } = errorFactory<
  StringErrorData,
  typeof StringErrorCode
>(StringErrorCode);

@StringError('STRING_NOT_ONLY_NUMBERS_ERROR')
class StringNotOnlyNumbersError extends StringErrorClass {}

@StringError('STRING_MIN_LENGTH_ERROR')
class StringMinLengthError extends StringErrorClass {}

@StringError('STRING_MAX_LENGTH_ERROR')
class StringMaxLengthError extends StringErrorClass {}

const onlyNumbersRegex = /^[0-9]+$/;

const validateOnlyNumbers = (value: string) =>
  pipe(
    z.string().regex(onlyNumbersRegex).safeParse(value),
    Either.liftPredicate(
      (isValid) => isValid.success,
      () =>
        new StringNotOnlyNumbersError({
          message: 'Not only numbers',
          data: { value },
        }),
    ),
  );

const validateMinLength = (value: string, min: number) =>
  pipe(
    value.length >= min,
    Either.liftPredicate(
      (isValid) => isValid,
      () =>
        new StringMinLengthError({
          message: 'Invalid min length',
          data: { value },
        }),
    ),
  );

const validateMaxLength = (value: string, max: number) =>
  pipe(
    value.length <= max,
    Either.liftPredicate(
      (isValid) => isValid,
      () =>
        new StringMaxLengthError({
          message: 'Invalid max length',
          data: { value },
        }),
    ),
  );

const stringValidationPipe = (value: string, min: number, max: number) =>
  pipe(
    Either.Do,
    Either.andThen(() => validateOnlyNumbers(value)),
    Either.andThen(() => validateMinLength(value, min)),
    Either.andThen(() => validateMaxLength(value, max)),
  );

export {
  StringErrorClass,
  StringMaxLengthError,
  StringMinLengthError,
  StringNotOnlyNumbersError,
  stringValidationPipe,
};
