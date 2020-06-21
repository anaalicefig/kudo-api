import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar_url) {
      await this.storageProvider.deleteFile(user.avatar_url)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar_url = filename

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
