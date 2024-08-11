import { Either, pipe } from 'effect';
import z from 'zod';

import { ErrorFactory } from '../lib';

const StringErrorCodeMapper = {
  STRING_ONLY_NUMBERS_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_MIN_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
  STRING_MAX_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
} as const;

type StringErrorData = {
  value: string;
};

const StringErrorFactory = ErrorFactory<typeof StringErrorCodeMapper, StringErrorData>(
  StringErrorCodeMapper,
);

class StringOnlyNumbersError extends StringErrorFactory('STRING_ONLY_NUMBERS_ERROR') {}

class StringMinLengthError extends StringErrorFactory('STRING_MIN_LENGTH_ERROR') {}

class StringMaxLengthError extends StringErrorFactory('STRING_MAX_LENGTH_ERROR') {}

const onlyNumbersRegex = /^[0-9]+$/;

const validateOnlyNumbers = (value: string) =>
  pipe(
    z.string().regex(onlyNumbersRegex).safeParse(value),
    Either.liftPredicate(
      (isValid) => isValid.success,
      () =>
        new StringOnlyNumbersError({
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

export { StringMaxLengthError, StringMinLengthError, StringOnlyNumbersError, stringValidationPipe };
