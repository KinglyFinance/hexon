import { Event } from '../../lib';
import { type UserProps } from './user-entity';

export class UserEvent extends Event<UserProps, 'USER_CREATED_EVENT' | 'USER_DELETED_EVENT'> {}
