import {Entity, model, property} from '@loopback/repository';
import {CountryTb} from './country-tb.model';

@model()
export class ContacInfoTb extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  UserID: number;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 60,
      errorMessage: {
        minLength: 'El nombre de la ciudad debe ser de minimo 5 caracteres',
        maxLength: 'El nombre de la ciudad debe ser de maximo 60 caracteres',
      },
    },
  })
  Address?: string;

  @property({
    type: 'object',
  })
  CountryID: CountryTb;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 50,
      errorMessage: {
        minLength: 'El nombre de la ciudad debe ser de minimo 5 caracteres',
        maxLength: 'El nombre de la ciudad debe ser de maximo 50 caracteres',
      },
    },
  })
  City?: string;

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
  Phone?: string;

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
  CelPhone?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 3,
      maxLength: 100,
      errorMessage: {
        minLength: 'El nombre de la ciudad debe ser de minimo 3 caracteres',
        maxLength: 'El nombre de la ciudad debe ser de maximo 100 caracteres',
      },
    },
  })
  EmergencyName?: string;

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
  EmergencyPhone?: string;

  constructor(data?: Partial<ContacInfoTb>) {
    super(data);
  }
}

export interface ContacInfoTbRelations {
  // describe navigational properties here
}

export type ContacInfoTbWithRelations = ContacInfoTb & ContacInfoTbRelations;
