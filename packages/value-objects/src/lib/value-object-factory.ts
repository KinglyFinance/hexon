import { Either, pipe } from 'effect';

import { type PrimitiveValue } from '@hexon/common';
import { type ErrorType } from '@hexon/errors';

import { ValueObject } from './value-object';

/**
 * Factory that creates a value object for the given type.
 */
export function ValueObjectFactory<
  // The type is the type of the value object it self, it's used to define the type of the create
  // method. For instance, if the value object class is a UserId, the type will be the UserId class
  // and not the extended class like UlidValueObject.
  T,
  // The value is the primitive value that the value object will store. It can be a string, number,
  // boolean, or any other primitive value.
  V extends PrimitiveValue,
  // The create error type is the error type that will be returned when the value object creation
  // fails. It must be a valid error type.
  E extends ErrorType,
  // The optional flag indicates if the value is optional or not. If true, the value can be
  // undefined or null, otherwise it must be a valid value. If it's optional, the create method
  // will not require a value and will use the default value function to create the value object.
  // Obviously, the default value function must be provided in this case.
  O extends boolean = false,
>() {
  // The create method can receive a value or not, depending on the optional flag.
  type CreateParam = O extends true ? [value?: V] : [value: V];

  return class ValueObjectClass extends ValueObject<V> {
    // Override the KEY property to be a unique symbol for the value object.
    static override KEY = Symbol();

    /**
     * Creates a new value object for the given value (if provided) and validates it. If the
     * the value is not provided, it uses the default value function to create the value object.
     *
     * @param value - The value to create the value object with.
     * @returns A new value object instance if the validation passes, otherwise the respective
     * validation error.
     */
    public static create(...args: CreateParam): Either.Either<T, E> {
      // The value always will be the first argument.
      const value = args[0];

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
