import { ErrorClass } from './error-class';
import type { ErrorCode, ErrorData, ErrorMapper, ErrorParams, ErrorScope } from './types';

/**
 * Creates for the given error mapper a new error factory function. It should be used to create a
 * set of error classes with the same error data and scope.
 *
 * @param codes - The error codes mapping used to create the error classes.
 * @returns An custom error factory function which receives the specific error code and returns a
 * new error class.
 *
 * @example
 * ```ts
 * // Error mapper for string errors.
 * const StringErrorMapper = {
 *    STRING_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
 *    STRING_MIN_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
 *    STRING_MAX_LENGTH_ERROR: 'VALUE_OBJECT_ERROR',
 * } as const;
 *
 * // Data for string errors.
 * type StringErrorData = {
 * value: string;
 * };
 *
 * // Factory for string errors.
 * const StringErrorFactory = ErrorFactory<typeof StringErrorMapper, StringErrorData>(
 * StringErrorMapper,
 * );
 *
 * // Create a new error class for each error code.
 * class StringLengthError extends StringErrorFactory('STRING_LENGTH_ERROR') {}
 * class StringMinLengthError extends StringErrorFactory('STRING_MIN_LENGTH_ERROR') {}
 * class StringMaxLengthError extends StringErrorFactory('STRING_MAX_LENGTH_ERROR') {}
 *
 * // Create a new error instance.
 * const error = new StringLengthError({
 *    message: 'The string length is invalid',
 *    data: { value: 'test' }
 * });
 *
 * // Check the error instance.
 * console.log(error instanceof ErrorClass); // Output: true
 * console.log(error instanceof StringLengthError); // Output: true
 * console.log(error.scope); // Output: 'VALUE_OBJECT_ERROR'
 * console.log(error.code); // Output: 'STRING_LENGTH_ERROR'
 * console.log(error.data); // Output: { value: 'test' }
 * console.log(error.message); // Output: 'The string length is invalid'
 * console.log(error.name); // Output: 'StringLengthError'
 * console.log(error.stack); // Output: Error stack trace
 * ```
 */
export function ErrorFactory<M extends ErrorMapper, D extends ErrorData = undefined>(codes: M) {
  return <
    C extends keyof M extends ErrorCode ? keyof M : ErrorCode,
    S extends ErrorScope = M[C] extends ErrorScope ? M[C] : never,
  >(
    code: C,
  ) =>
    class Error extends ErrorClass<C, S, D> {
      constructor(params: ErrorParams<D>) {
        super(codes[code] as S, code, params);
      }
    };
}
