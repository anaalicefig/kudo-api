import { getRepository, Repository } from 'typeorm'

import ISendKudosRepository from '@modules/kudos/repositories/ISendKudosRepository'
import ICreateSendKudoDTO from '@modules/kudos/dtos/ICreateSendKudoDTO'

import SendKudo from '../entities/SendKudo'

class SendKudosRepository implements ISendKudosRepository {
  private ormRepository: Repository<SendKudo>

  constructor() {
    this.ormRepository = getRepository(SendKudo)
  }

  public async findById(id: string): Promise<SendKudo | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async create({
    gave_user,
    received_user,
    type,
  }: ICreateSendKudoDTO): Promise<SendKudo> {
    const kudo = this.ormRepository.create({
      received_user,
      gave_user,
      type,
    })

    await this.ormRepository.save(kudo)

    return kudo
  }

  public async save(kudo: SendKudo): Promise<SendKudo> {
    return this.ormRepository.save(kudo)
  }
}

export default SendKudosRepository
