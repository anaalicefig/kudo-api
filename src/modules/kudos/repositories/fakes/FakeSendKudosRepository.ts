import ISendKudosRepository from '@modules/kudos/repositories/ISendKudosRepository'
import ICreateSendKudoDTO from '@modules/kudos/dtos/ICreateSendKudoDTO'

import SendKudo from '../../infra/typeorm/entities/SendKudo'
import { uuid } from 'uuidv4'

class UsersRepository implements ISendKudosRepository {
  private kudos: SendKudo[] = []

  public async findById(id: string): Promise<SendKudo | undefined> {
    const findKudo = this.kudos.find(kudo => kudo.id === id)

    return findKudo
  }

  public async create({
    gave_user,
    received_user,
    type,
  }: ICreateSendKudoDTO): Promise<SendKudo> {
    const kudo = new SendKudo()

    Object.assign(kudo, { id: uuid(), gave_user, received_user, type })

    this.kudos.push(kudo)

    return kudo
  }

  public async save(kudo: SendKudo): Promise<SendKudo> {
    const findIndex = this.kudos.findIndex(findKudo => findKudo.id === kudo.id)

    this.kudos[findIndex] = kudo

    return kudo
  }
}

export default UsersRepository
