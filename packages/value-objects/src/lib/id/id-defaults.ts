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
