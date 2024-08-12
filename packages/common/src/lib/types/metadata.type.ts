/**
 * Metadata type that represents the information of a element through the Hexon ecosystem.
 * This includes the name, description, and version.
 */
export type MetadataType = {
  /**
   * Represents the kind of element that the metadata is describing.
   */
  kind: 'ValueObject' | 'Error';

  /**
   * Element name, which is unique across the Hexon ecosystem.
   */
  name: string;

  /**
   * Element description that provides a brief explanation of the component's purpose.
   */
  description: string;

  /**
   * Element version that follows the semantic versioning specification.
   * @see https://semver.org/
   */
  version: `${number}.${number}.${number}`;
};
