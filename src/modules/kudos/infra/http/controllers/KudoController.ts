import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateSendKudoService from '@modules/kudos/services/CreateSendKudoService'

export default class KudoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { received_user, type } = request.body

    const createKudo = container.resolve(CreateSendKudoService)

    const updatedGaveKudoUser = await createKudo.execute({
      received_user,
      gave_user: request.user.id,
      type,
    })

    return response.json(updatedGaveKudoUser)
  }
}
