/* eslint-disable @typescript-eslint/no-explicit-any */
import { type MetadataType } from '../types';

/**
 * Metadata decorator that adds metadata to a class.
 *
 * @param metadata - The metadata to add to the class.
 * @returns A class decorator that adds metadata to a class.
 *
 * @example
 *
 * ```ts
 * Metadata({
 *    kind: 'ValueObject',
 *    name: 'UserPassword',
 *    description: 'Represents a customer password.',
 *    version: '0.1.0',
 * })
 * export class UserPassword extends StringValueObject {}
 * ```
 */
export function Metadata(metadata: MetadataType) {
  return function (originalConstructor: any) {
    // The new constructor adds the metadata to the instance.
    function newConstructor(...args: any[]) {
      const instance = new originalConstructor(...args);
      instance.metadata = metadata;
      return instance;
    }

    // Keep the original prototype and static properties
    newConstructor.prototype = originalConstructor.prototype;
    Object.setPrototypeOf(newConstructor, originalConstructor);

    // To keep the constructor original name.
    Object.defineProperty(newConstructor, 'name', {
      value: originalConstructor.name,
      configurable: true,
    });

    return newConstructor;
  } as ClassDecorator;
}
