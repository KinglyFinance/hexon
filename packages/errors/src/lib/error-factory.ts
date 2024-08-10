/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorClass } from './error-class';
import type { ErrorCode, ErrorData, ErrorMapper, ErrorScope } from './types';

/**
 * Decorator function that creates a new error class with the specified scope and code.
 *
 * @param scope - The error scope.
 * @param code - The error code.
 * @returns A new error class.
 */
function ErrorDecorator<C extends ErrorCode, D extends ErrorData>(scope: ErrorScope, code: C) {
  return function <T extends new (...args: any[]) => ErrorClass<C, D>>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        this.scope = scope;
        this.code = code;
        this.name = this.createErrorName(code);
      }
    } as T;
  };
}

/**
 * Creates for the given error codes a new error class and a decorator function. This function
 * is used to create a set of error classes with the same error data and scope.
 *
 * @param codes - The error codes mapping used to create the error classes.
 * @returns An object with the error class and the decorator function.
 */
export function errorFactory<
  D extends ErrorData,
  M extends ErrorMapper,
  C extends ErrorCode = keyof M extends ErrorCode ? keyof M : ErrorCode,
>(codes: M) {
  return {
    Error: class extends ErrorClass<C, D> {},
    Decorator: (code: C) => ErrorDecorator<C, D>(codes[code] as ErrorScope, code),
  };
}
