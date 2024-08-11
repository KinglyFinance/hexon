import { type ErrorData } from './error-data.type';

/**
 * Represents the error parameters used to instantiate a new error.
 */
export type ErrorParams<D extends ErrorData> = {
  /**
   * The error message, a human-readable description of the error.
   */
  readonly message: string;
} & (D extends undefined
  ? {
      //  Nothing to add.
    }
  : {
      /**
       * The error data, additional information about the error.
       */
      readonly data: D;
    });
