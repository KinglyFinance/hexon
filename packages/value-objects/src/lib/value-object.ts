import type { Either } from 'effect';

import type { Func, PrimitiveValue } from '@hexon/common';
import { type ErrorType } from '@hexon/errors';

/**
 * Represents a validation function that returns a boolean or an error in case of failure.
 */
type ValidationFunction = Func<Either.Either<boolean, ErrorType>>;

/**
 * Represents a default value function that returns a primitive value.
 */
export type DefaultValueFunction<V extends PrimitiveValue> = Func<V>;

export class ValueObject<V extends PrimitiveValue> {
  protected constructor(
    public readonly value: V,
    public readonly name: string,
  ) {}

  /**
   * A unique key for the value object. It is used to store the validation functions for each
   * value object and future features that require a unique key.
   */
  static KEY = Symbol();

  /**
   * A map that contains the validation functions for each value object.
   */
  static validationMap: Map<symbol, ValidationFunction[]> = new Map();

  /**
   * A default value function for the value object.
   */
  static defaultValueFn: DefaultValueFunction<PrimitiveValue> | null = null;

  /**
   * Adds a validation function to the value object.
   */
  static addValidation(validator: ValidationFunction) {
    // Using the KEY as a unique identifier in the validation map store.
    const validationKey = this.KEY;

    // If the validation key does not exist, create a new entry.
    if (!this.validationMap.has(validationKey)) {
      this.validationMap.set(validationKey, []);
    }

    // And then push the new validator to the validation map.
    this.validationMap.get(validationKey)?.push(validator);
  }

  /**
   * Compares the current value object with another value object.
   *
   * @param other - The other value object to compare with.
   * @returns True if the value objects are equal, false otherwise.
   */
  public equals(other: ValueObject<V>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }

  /**
   * Returns a string representation of the value object.
   *
   * @returns A string representation of the value object.
   */
  public toString() {
    return JSON.stringify({ value: this.value });
  }
}
