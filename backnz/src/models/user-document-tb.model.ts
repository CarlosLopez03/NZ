import {Entity, model, property} from '@loopback/repository';
import {TypeDocumentTb} from './type-document-tb.model';

@model()
export class UserDocumentTb extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'object',
  })
  UserID?: object;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 20,
      errorMessage: {
        minLength: 'El nombre del documento debe ser de minimo 5 caracteres',
        maxLength: 'El nombre del documento debe ser de maximo 20 caracteres',
      },
    },
  })
  Document?: string;

  @property({
    type: 'object',
  })
  TypeDocumentID?: TypeDocumentTb;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 60,
      errorMessage: {
        minLength:
          'El nombre de la fecha de expedición debe ser de minimo 5 caracteres',
        maxLength:
          'El nombre de la fecha de expedición debe ser de maximo 60 caracteres',
      },
    },
  })
  PlaceExpedition?: string;

  @property({
    type: 'date',
  })
  DateExpedition?: Date;

  constructor(data?: Partial<UserDocumentTb>) {
    super(data);
  }
}

export interface UserDocumentTbRelations {
  // describe navigational properties here
}

export type UserDocumentTbWithRelations = UserDocumentTb &
  UserDocumentTbRelations;
