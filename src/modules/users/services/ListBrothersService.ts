import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  user_id: string
}

@injectable()
class ListBrothersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllBrothers({
      except_user_id: user_id,
    })

    return users
  }
}

export default ListBrothersService
