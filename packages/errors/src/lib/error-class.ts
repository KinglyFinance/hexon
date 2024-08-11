import type { ErrorCode, ErrorData, ErrorParams, ErrorScope } from './types';

/**
 * Error base class that extends the native Error. It provides additional properties like scope,
 * code, and data, useful for error handling and logging.
 *
 * @note
 * Do not use this class directly. Instead, use error factories to create new error
 * instances.
 */
export class ErrorClass<
  C extends ErrorCode,
  S extends ErrorScope,
  D extends ErrorData,
> extends Error {
  public readonly scope: S;
  public readonly code: C;
  public readonly data?: D;

  /**
   * Creates a new instance of the error class.
   *
   * @param scope - The scope of the error.
   * @param code - The error code.
   * @param params - The error parameters. This includes the message and data (if provided).
   * @returns A new instance of the error class.
   */
  constructor(scope: S, code: C, params: ErrorParams<D>) {
    super(params.message);
    this.scope = scope;
    this.code = code;
    this.name = this.createErrorName(code);

    // Only if the data is provided, it is assigned to the error.
    if ('data' in params) {
      this.data = params.data as D;
    }
  }

  /**
   * Creates a new error name based on the error code.
   *
   * @param code - The error code.
   * @returns The error name.
   */
  public createErrorName(code: ErrorCode) {
    // The name is the same as the code but with the first letter of each word capitalized.
    return code
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
}
