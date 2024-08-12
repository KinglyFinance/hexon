import { Metadata, type MetadataType } from '../../lib';
import { GenericClass } from '../common';

const metadata: MetadataType = {
  kind: 'ValueObject',
  name: 'Customer',
  description: 'Represents a customer user.',
  version: '0.0.1',
};

@Metadata(metadata)
class Customer extends GenericClass {
  public metadata!: MetadataType;
}

describe('Metadata Decorator', () => {
  it('should add metadata to a class', () => {
    const customer = new Customer('bob', 'tom');

    // Class properties should be intact.
    expect(customer).toBeInstanceOf(Customer);
    expect(customer).toBeInstanceOf(GenericClass);
    expect(customer.value1).toBe('bob');
    expect(customer.value2).toBe('tom');
    expect(customer.name).toBe('GenericClass');
    expect(customer.isTrue()).toBe(true);

    // Static methods should be intact.
    expect(Customer.className()).toBe('Customer');

    // Metadata should be added.
    expect(customer.metadata.kind).toBe(metadata.kind);
    expect(customer.metadata.name).toBe(metadata.name);
    expect(customer.metadata.description).toBe(metadata.description);
    expect(customer.metadata.version).toBe(metadata.version);
  });
});
