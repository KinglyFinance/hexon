import { nanoid } from 'nanoid';
import { ulid } from 'ulid';
import { v4 as uuid } from 'uuid';

/**
 * Default generator for UUIDs.
 *
 * @returns A new UUID.
 */
export const uuidDefault = () => uuid();

/**
 * Default generator for ULIDs.
 *
 * @returns A new ULID.
 */
export const ulidDefault = () => ulid();

/**
 * Default generator for nanoids. It uses the default nanoid implementation which is 21 characters
 * long and the same collision probability as a UUID.
 *
 * @returns A new nanoid.
 */
export const nanoIdDefault = () => nanoid();
