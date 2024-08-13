import { type PrimitiveValue } from '@hexon/common';
import { ErrorFactory } from '@hexon/errors';

import { type EnumKeyType } from './enum-value-object';

/**
 * Data for Enum errors.
 */
type EnumErrorData = {
  value: EnumKeyType;
  allowedValues: PrimitiveValue[];
};

/**
 * Mapper for Enum errors.
 */
const EnumErrorMapper = {
  ENUM_INVALID_MEMBER_ERROR: 'VALUE_OBJECT_ERROR',
} as const;

/**
 * Factory for Enum errors.
 */
const EnumErrorFactory = ErrorFactory<typeof EnumErrorMapper, EnumErrorData>(EnumErrorMapper);

/**
 * Enum error when the value is not found in the enum.
 */
class EnumInvalidMemberError extends EnumErrorFactory('ENUM_INVALID_MEMBER_ERROR') {}

/**
 * Contains all the possible Enum errors.
 */
type EnumError = EnumInvalidMemberError;

export { EnumError, EnumInvalidMemberError };
