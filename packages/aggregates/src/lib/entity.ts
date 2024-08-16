import { type PrimitiveValue } from '@hexon/common';
import { ValueObject } from '@hexon/value-objects';

import { type ToPrimitives } from './generics';

/**
 * Represents a value object that is part of a domain entity.
 */
export type EntityProperty = ValueObject<PrimitiveValue>;

/**
 * Type that represents a record of value objects or nested value objects that are part of an
 * domain entity.
 */
export type EntityProps = Record<
  string,
  | EntityProperty
  | EntityProperty[]
  | Record<string, EntityProperty>
  | Record<string, EntityProperty[]>
> & {
  /**
   * Unique identifier of the entity. Usually must be an ID value object.
   */
  id: ValueObject<string | number>;
};

/**
 * Represents a generic entity that is part of a domain. Useful for generic definitions or to
 * represent a domain entity in a generic way.
 */
export type EntityType = Entity<EntityProps>;

/**
 * Represents a domain entity that is part of a domain. It is a composition of value objects
 * that have a specific behavior and business rules. That means that the entity is responsible
 * of a encapsulate the domain logic.
 *
 * All invariants must be managed inside the entity through semantics methods that change or
 * transform the state of the entity.
 *
 * An entity must have an unique identifier because it is the way to identify the entity in the
 * domain and differentiate it from other entities of the same type.
 */
export class Entity<P extends EntityProps> {
  constructor(protected readonly props: P) {}

  /**
   * Returns the primitive values of the entity.
   */
  public get primitives() {
    return Entity.toPrimitives(this.props);
  }

  /**
   * Transforms the given data of value objects to primitives values. This is useful to
   * serialize the entity to a more simple representation.
   */
  public static toPrimitives<T extends EntityProps>(props: T): ToPrimitives<T> {
    // Create a record to store the primitive values.
    const record: Record<string, PrimitiveValue> = {};

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const value = props[key];

        if (value instanceof ValueObject || value instanceof Array) {
          // If array we need to check if is a value objects or primitives.
          if (Array.isArray(value)) {
            const allElementsArePrimitives = value.every(
              (item) =>
                typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean',
            );

            record[key] = allElementsArePrimitives ? value : value.map(({ value }) => value);

            // Otherwise, we infer that is a value object
          } else {
            record[key] = value.value;
          }
        } else if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean' ||
          typeof value === 'object'
        ) {
          record[key] = value;
        }
        // If the value is not a value object, we ignore it.
      }
    }

    return record as ToPrimitives<T>;
  }
}
