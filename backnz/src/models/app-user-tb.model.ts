import {model, property} from '@loopback/repository';
import {UserTb} from '.';

@model()
export class AppUserTb extends UserTb {
  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
    jsonSchema: {
      format: 'email',
    },
  })
  email?: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
  })
  verificationToken?: string;

  constructor(data?: Partial<AppUserTb>) {
    super(data);
  }
}

export interface AppUserTbRelations {
  // describe navigational properties here
}

export type AppUserTbWithRelations = AppUserTb & AppUserTbRelations;
