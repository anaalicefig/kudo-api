import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import User from '../infra/typeorm/entities/User'

interface IRequestUsers {
  name: string
  password: string
  email: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequestUsers): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email)

    if (checkUserExist) {
      throw new AppError('Email adress already used.')
    }

    const hashedPassword = await this.hashProvider.genereteHash(password)

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    })

    return user
  }
}

export default CreateUserService
