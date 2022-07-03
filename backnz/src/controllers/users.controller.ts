import {Filter, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AppUserTb} from '../models';
import {AppUserTbRepository} from '../repositories';

export class UsersController {
  constructor(
    @repository(AppUserTbRepository)
    public appUserTbRepository: AppUserTbRepository,
  ) {}

  @post('/api-users/createUser')
  @response(200, {
    description: 'AppUserTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppUserTb)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTb, {
            title: 'NewAppUserTb',
            exclude: ['id'],
          }),
        },
      },
    })
    appUserTb: Omit<AppUserTb, 'id'>,
  ): Promise<AppUserTb> {
    return this.appUserTbRepository.create(appUserTb);
  }

  @get('/api-users/getUsers')
  @response(200, {
    description: 'Array of AppUserTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AppUserTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AppUserTb) filter?: Filter<AppUserTb>,
  ): Promise<AppUserTb[]> {
    return this.appUserTbRepository.find(filter);
  }

  @get('/api-users/findEmailUser/{email}')
  @response(200, {
    description: 'User Email Exists',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppUserTb, {includeRelations: true}),
      },
    },
  })
  async findOneEmailUser(@param.path.string('email') email: string) {
    return this.appUserTbRepository.find({where: {and: [{email: email}]}}, {});
  }

  @patch('/api-users/updateUserById/{id}')
  @response(204, {
    description: 'AppUserTb PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTb, {partial: true}),
        },
      },
    })
    appUserTb: AppUserTb,
  ): Promise<void> {
    await this.appUserTbRepository.updateById(id, appUserTb);
  }

  @del('/api-users/deleteUserById/{id}')
  @response(204, {
    description: 'AppUserTb DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appUserTbRepository.deleteById(id);
  }
}
