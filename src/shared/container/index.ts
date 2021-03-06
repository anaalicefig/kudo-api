import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import ISendKudosRepository from '@modules/kudos/repositories/ISendKudosRepository'
import SendKudosRepository from '@modules/kudos/infra/typeorm/repositories/SendKudosRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<ISendKudosRepository>(
  'SendKudosRepository',
  SendKudosRepository,
)
