import { type ErrorCode } from './error-code.type';
import { type ErrorScope } from './error-scope.type';

/**
 * Error mapper that maps error codes to error scopes. Useful for creating error classes using the
 * error factory.
 */
export type ErrorMapper = Record<ErrorCode, ErrorScope>;
