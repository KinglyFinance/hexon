import type { ErrorCode, ErrorData, ErrorParams, ErrorReason, ErrorScope } from './types';

/**
 * Error base class that extends the native Error. It provides additional properties like scope,
 * code, reason, and data, useful for error handling and logging.
 */
export class ErrorClass<C extends ErrorCode, D extends ErrorData> extends Error {
  public scope!: ErrorScope;
  public code!: C;
  public readonly reason?: ErrorReason;
  public readonly data?: D;

  constructor(params: ErrorParams<D>) {
    const { message, reason, data } = params;

    super(message);
    this.reason = reason;
    this.data = data;
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
