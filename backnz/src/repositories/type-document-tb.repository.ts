import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsuariosDataSource} from '../datasources';
import {TypeDocumentTb, TypeDocumentTbRelations} from '../models';

export class TypeDocumentTbRepository extends DefaultCrudRepository<
  TypeDocumentTb,
  typeof TypeDocumentTb.prototype.id,
  TypeDocumentTbRelations
> {
  constructor(
    @inject('datasources.usuarios') dataSource: UsuariosDataSource,
  ) {
    super(TypeDocumentTb, dataSource);
  }
}
