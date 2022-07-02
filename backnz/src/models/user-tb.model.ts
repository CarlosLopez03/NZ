import {Entity, model, property} from '@loopback/repository';

@model()
export class UserTb extends Entity {
  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 20,
      errorMessage: {
        minLength: 'El nombre de la ciudad debe ser de minimo 5 caracteres',
        maxLength: 'El nombre de la ciudad debe ser de maximo 20 caracteres',
      },
    },
  })
  LastName?: string;

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
        minLength: 'El nombre de la ciudad debe ser de minimo 5 caracteres',
        maxLength: 'El nombre de la ciudad debe ser de maximo 20 caracteres',
      },
    },
  })
  Name?: string;

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
