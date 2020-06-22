import { Router } from 'express'

import BrothersController from '../controllers/BrothersController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const brothersRouter = Router()

const brothersController = new BrothersController()

brothersRouter.get('/', ensureAuthenticated, brothersController.index)

export default brothersRouter
