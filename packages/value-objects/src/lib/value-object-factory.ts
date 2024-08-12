import { Either, pipe } from 'effect';

import { type PrimitiveValue } from '@hexon/common';
import { type ErrorType } from '@hexon/errors';

import { ValueObject } from './value-object';

/**
 * Factory that creates a value object for the given type.
 */
export function ValueObjectFactory<T, V extends PrimitiveValue, E extends ErrorType>() {
  return class extends ValueObject<V> {
    /**
     * Creates a new value object for the given value (if provided) and validates it. If the
     * the value is not provided, it uses the default value function to create the value object.
     *
     * @param value - The value to create the value object with.
     * @returns A new value object instance if the validation passes, otherwise the respective
     * validation error.
     */
    public static create(value?: V): Either.Either<T, E> {
      const useDefaultFn = value === undefined || value === null;

      // Mandatory check for the default value function.
      if (useDefaultFn && !this.defaultValueFn) {
        throw new Error('Value not provided and needs a default value function.');
      }

      // The final value if the value is not provided, otherwise will be the provided value.
      const finalValue = useDefaultFn && this.defaultValueFn ? this.defaultValueFn() : value;

      // Get the validation set for the current value object.
      const validations = ValueObject.validationMap.get(this.KEY) || [];

      // Run all the validations for the current value object.
      const validationResult = Either.all(validations.map((validation) => validation(finalValue)));

      // If the validation fails, return the error, otherwise return the value object.
      return pipe(
        Either.Do,
        Either.andThen(() => validationResult),
        Either.map(() => new this(finalValue as V, this.name)),
      ) as Either.Either<T, E>;
    }
  };
}
