import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsuariosDataSource} from '../datasources';
import {UserTb, UserTbRelations} from '../models';

export class UserTbRepository extends DefaultCrudRepository<
  UserTb,
  typeof UserTb.prototype.id,
  UserTbRelations
> {
  constructor(
    @inject('datasources.usuarios') dataSource: UsuariosDataSource,
  ) {
    super(UserTb, dataSource);
  }
}
