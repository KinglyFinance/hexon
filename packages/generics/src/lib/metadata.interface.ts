/**
 * Metadata type that represents the information of a component through the Hexon ecosystem.
 * This includes the name, description, and version.
 */
export type Metadata = {
  /**
   * Component name, which is unique across the Hexon ecosystem.
   */
  name: string;
  /**
   * Component description that provides a brief explanation of the component's purpose.
   */
  description: string;
  /**
   * Component version that follows the semantic versioning specification.
   */
  version: `${number}.${number}.${number}`;
};
