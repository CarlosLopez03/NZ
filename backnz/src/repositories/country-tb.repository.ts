import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsuariosDataSource} from '../datasources';
import {CountryTb, CountryTbRelations} from '../models';

export class CountryTbRepository extends DefaultCrudRepository<
  CountryTb,
  typeof CountryTb.prototype.id,
  CountryTbRelations
> {
  constructor(
    @inject('datasources.usuarios') dataSource: UsuariosDataSource,
  ) {
    super(CountryTb, dataSource);
  }
}
