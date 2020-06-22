import SendKudo from '../infra/typeorm/entities/SendKudo'

import ICreateSendKudoDTO from '../dtos/ICreateSendKudoDTO'

export default interface IUsersRepository {
  findById(id: string): Promise<SendKudo | undefined>
  create(data: ICreateSendKudoDTO): Promise<SendKudo>
  save(kudo: SendKudo): Promise<SendKudo>
}
