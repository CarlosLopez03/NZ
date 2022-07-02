import {Entity, model, property} from '@loopback/repository';

@model()
export class TypeDocumentTb extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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
  NameTypeDocument?: string;

  constructor(data?: Partial<TypeDocumentTb>) {
    super(data);
  }
}

export interface TypeDocumentTbRelations {
  // describe navigational properties here
}

export type TypeDocumentTbWithRelations = TypeDocumentTb &
  TypeDocumentTbRelations;
