import {Entity, model, property} from '@loopback/repository';

@model()
export class CountryTb extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 4,
      maxLength: 4,
      errorMessage: {
        minLength: 'El nombre de la ciudad debe ser de minimo 4 caracteres',
        maxLength: 'El nombre de la ciudad debe ser de maximo 4 caracteres',
      },
    },
  })
  CountryCode?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 5,
      maxLength: 100,
      errorMessage: {
        minLength: 'El nombre de la ciudad debe ser de minimo 5 caracteres',
        maxLength: 'El nombre de la ciudad debe ser de maximo 100 caracteres',
      },
    },
  })
  CountryName?: string;

  constructor(data?: Partial<CountryTb>) {
    super(data);
  }
}

export interface CountryTbRelations {
  // describe navigational properties here
}

export type CountryTbWithRelations = CountryTb & CountryTbRelations;
