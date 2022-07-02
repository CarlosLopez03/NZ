import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsuariosDataSource} from '../datasources';
import {AppUserTb, AppUserTbRelations} from '../models';

export class AppUserTbRepository extends DefaultCrudRepository<
  AppUserTb,
  typeof AppUserTb.prototype.id,
  AppUserTbRelations
> {
  constructor(
    @inject('datasources.usuarios') dataSource: UsuariosDataSource,
  ) {
    super(AppUserTb, dataSource);
  }
}
