import {Entity, model, property} from '@loopback/repository';
import {UserDocumentTb} from './user-document-tb.model';
import {ContacInfoTb} from './contac-info-tb.model';

@model()
export class UserTb extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 20,
      errorMessage: {
        minLength: 'El nombre del usuario debe ser de minimo 5 caracteres',
        maxLength: 'El nombre del usuario debe ser de maximo 20 caracteres',
      },
    },
  })
  Name?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 20,
      errorMessage: {
        minLength: 'El apellido del usuario debe ser de minimo 5 caracteres',
        maxLength: 'El apellido del usuario debe ser de maximo 20 caracteres',
      },
    },
  })
  LastName?: string;

  @property({
    type: 'object',
  })
  documentUser?: UserDocumentTb;

  @property({
    type: 'object',
  })
  infoUser?: ContacInfoTb;

  @property({
    type: 'boolean',
  })
  isMilitar?: boolean;

  @property({
    type: 'date',
  })
  TimeCreate?: Date;

  @property({
    type: 'boolean',
  })
  isTemporal?: boolean;

  constructor(data?: Partial<UserTb>) {
    super(data);
  }
}

export interface UserTbRelations {
  // describe navigational properties here
}

export type UserTbWithRelations = UserTb & UserTbRelations;
