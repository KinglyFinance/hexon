/**
 * Represents the error scope. It is used to categorize the error and help to identify the error
 * source, so it can be handled properly by a higher layer.
 */
export type ErrorScope =
  /**
   * Business rule error type. Represents an error that occurs when a business rule is violated
   * (i.e. as a user trying to create an account with an email that is already in use).
   */
  | 'BUSINESS_RULE_ERROR'

  /**
   * Value Object validation type. Represents an error that occurs when a value object is invalid
   * (i.e. as a user trying to create an account with an invalid email format).
   */
  | 'VALUE_OBJECT_ERROR'

  /**
   * External error that affects some domain business logic or value validation (commonly used for
   * domain ports/repositories errors).
   */
  | 'ADAPTER_ERROR'

  /**
   * Domain specification error. Represents an error that occurs when a domain specification is
   * violated (i.e. as a user trying to login and my account is not active).
   */
  | 'SPECIFICATION_ERROR'

  /**
   * Use case error. Represents an error that occurs when a use case is not able to complete its
   * operation.
   */
  | 'USE_CASE_ERROR';
