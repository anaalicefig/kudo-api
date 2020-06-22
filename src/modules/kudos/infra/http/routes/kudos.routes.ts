import { Router } from 'express'

import KudoController from '../controllers/KudoController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const kudoRouter = Router()

const kudoController = new KudoController()

kudoRouter.post('/', ensureAuthenticated, kudoController.create)

export default kudoRouter
