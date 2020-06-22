import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ISendKudosRepository from '@modules/kudos/repositories/ISendKudosRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

type KudoTypes = 'learned' | 'was_awesome' | 'grateful'

interface IRequestSendKudos {
  received_user: string
  gave_user: string
  type: KudoTypes
}

@injectable()
class CreateSendKudoService {
  constructor(
    @inject('SendKudosRepository')
    private sendKudosRepository: ISendKudosRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    received_user,
    gave_user,
    type,
  }: IRequestSendKudos): Promise<User> {
    const receivedUser = await this.usersRepository.findById(received_user)
    const gaveUser = await this.usersRepository.findById(gave_user)

    if (!receivedUser || !gaveUser) {
      throw new AppError('User not found')
    }

    if (gaveUser[type] === 0) {
      throw new AppError('You dont have kudo')
    }

    gaveUser[type] -= 1

    await this.usersRepository.save(gaveUser)

    await this.sendKudosRepository.create({
      gave_user,
      received_user,
      type,
    })

    return gaveUser
  }
}

export default CreateSendKudoService
