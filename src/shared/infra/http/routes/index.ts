import { Router } from 'express'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import brothersRouter from '@modules/users/infra/http/routes/brothers.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'
import kudosRouter from '@modules/kudos/infra/http/routes/kudos.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/profile', profileRouter)
routes.use('/kudos', kudosRouter)
routes.use('/brothers', brothersRouter)

export default routes
