import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {randomBytes} from 'crypto';
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
    appUserTb.paswword = randomBytes(32).toString('hex');
    return this.appUserTbRepository.create(appUserTb);
  }

  @get('/api-users/count')
  @response(200, {
    description: 'AppUserTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AppUserTb) where?: Where<AppUserTb>,
  ): Promise<Count> {
    return this.appUserTbRepository.count(where);
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

  @patch('/api-users')
  @response(200, {
    description: 'AppUserTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTb, {partial: true}),
        },
      },
    })
    appUserTb: AppUserTb,
    @param.where(AppUserTb) where?: Where<AppUserTb>,
  ): Promise<Count> {
    return this.appUserTbRepository.updateAll(appUserTb, where);
  }

  @get('/api-users/findUserById/{id}')
  @response(200, {
    description: 'AppUserTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppUserTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AppUserTb, {exclude: 'where'})
    filter?: FilterExcludingWhere<AppUserTb>,
  ): Promise<AppUserTb> {
    return this.appUserTbRepository.findById(id, filter);
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

  @put('/api-users/replaceUserById/{id}')
  @response(204, {
    description: 'AppUserTb PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() appUserTb: AppUserTb,
  ): Promise<void> {
    await this.appUserTbRepository.replaceById(id, appUserTb);
  }

  @del('/api-users/deleteUserById/{id}')
  @response(204, {
    description: 'AppUserTb DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appUserTbRepository.deleteById(id);
  }
}
