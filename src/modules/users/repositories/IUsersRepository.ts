import User from '../infra/typeorm/entities/User'

import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IFindAllBrothersDTO from '../dtos/IFindAllBrothersDTO'

export default interface IUsersRepository {
  findAllBrothers(data: IFindAllBrothersDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
