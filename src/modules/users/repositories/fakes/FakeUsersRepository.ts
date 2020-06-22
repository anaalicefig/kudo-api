import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllBrothersDTO from '@modules/users/dtos/IFindAllBrothersDTO'

import User from '../../infra/typeorm/entities/User'
import { uuid } from 'uuidv4'

class UsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findAllBrothers({
    except_user_id,
  }: IFindAllBrothersDTO): Promise<User[]> {
    const users = this.users.filter(user => user.id !== except_user_id)

    return users
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)

    return findUser
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      was_awesome: 2,
      grateful: 2,
      learned: 2,
    })

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user

    return user
  }
}

export default UsersRepository
