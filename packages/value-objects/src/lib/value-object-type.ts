import { type PrimitiveValue } from '@hexon/common';

import { type ValueObject } from './value-object';

/**
 * Represents any value object that extends the ValueObject class. Useful for type checking,
 * factory functions, decorators and other utilities.
 */
export type ValueObjectType = typeof ValueObject<PrimitiveValue>;
