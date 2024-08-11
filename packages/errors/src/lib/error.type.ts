import { type ErrorClass } from './error-class';
import type { ErrorCode, ErrorData, ErrorScope } from './types';

/**
 * Represents any error that extends the ErrorClass. Useful for type checking.
 */
export type ErrorType = ErrorClass<ErrorCode, ErrorScope, ErrorData>;
