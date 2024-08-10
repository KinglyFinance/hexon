import { type ErrorData } from './error-data.type';
import { type ErrorReason } from './error.reason.type';

/**
 * Represents the error parameters used to instantiate a new error.
 */
export type ErrorParams<D extends ErrorData> = {
  /**
   * The error message, a human-readable description of the error.
   */
  readonly message: string;

  /**
   * The error reason, a technical description of the error.
   */
  readonly reason?: ErrorReason;

  /**
   * The error data, additional information about the error.
   */
  readonly data?: D;
};
