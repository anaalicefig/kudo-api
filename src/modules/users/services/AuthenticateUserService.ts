import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import User from '../infra/typeorm/entities/User'

interface IRequestAuth {
  email: string
  password: string
}

interface IRespnseAuth {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestAuth): Promise<IRespnseAuth> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid email or password.', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatched) {
      throw new AppError('Invalid email or password.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService
