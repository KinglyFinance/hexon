import { v4 as uuid } from 'uuid';

import { Entity, type EntityProps } from './entity';
import { type ToPrimitives } from './generics';

/**
 * Opinionated type that represents a code for an event. The code must be in uppercase and
 * separated by underscores. The code must end with the suffix '_EVENT'.
 */
export type EventCode = Uppercase<`${string}_EVENT`>;

/**
 * A domain event is a representation of a change in the state of an entity or an aggregate, or a
 * change in the state of the system that is relevant to the business. Mostly, events are used to
 * communicate changes between aggregates or to notify other parts of the system about a change.
 * The payload of the event is the data that is relevant to the event and that must be communicated
 * to the other parts of the system.
 */
export class Event<
  /**
   * The event payload type has the same shape of a entity props. In most cases the payload are the
   * properties of an entity that are relevant to the event.
   */
  P extends EntityProps,
  /**
   * The event code is a string that represents the type of event that is being created. This code
   * is used to identify the event in publishing and subscribing systems (if needed).
   */
  C extends EventCode,
> {
  public readonly uuid: string;
  public readonly timestamp: Date;
  public readonly name: string;
  public readonly code: C;
  public readonly payload: ToPrimitives<P>;

  /**
   * Creates a new event with the given code and data.
   */
  constructor(code: C, payload: P) {
    // Auto generate uuid and timestamp.
    this.uuid = uuid();
    this.timestamp = new Date();

    // The name is generated from the code in a human readable format.
    this.code = code;
    this.name = code
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');

    // The payload is transformed to primitives to value objects classes.
    this.payload = Entity.toPrimitives(payload);
  }

  /**
   * Returns a string in JSON format representing the current object. This method is useful to
   * serialize the event to be represented in a log or to be sent to a message broker.
   */
  public toString() {
    return JSON.stringify({
      uuid: this.uuid,
      timestamp: this.timestamp,
      name: this.name,
      code: this.code,
      payload: this.payload,
    });
  }
}
