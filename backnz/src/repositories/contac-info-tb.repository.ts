import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsuariosDataSource} from '../datasources';
import {ContacInfoTb, ContacInfoTbRelations} from '../models';

export class ContacInfoTbRepository extends DefaultCrudRepository<
  ContacInfoTb,
  typeof ContacInfoTb.prototype.id,
  ContacInfoTbRelations
> {
  constructor(
    @inject('datasources.usuarios') dataSource: UsuariosDataSource,
  ) {
    super(ContacInfoTb, dataSource);
  }
}
