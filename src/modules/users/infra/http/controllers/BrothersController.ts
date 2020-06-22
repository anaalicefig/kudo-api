import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListBrothersService from '@modules/users/services/ListBrothersService'

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBrothers = container.resolve(ListBrothersService)

    const user = await listBrothers.execute({
      user_id: request.user.id,
    })

    return response.json(classToClass(user))
  }
}
