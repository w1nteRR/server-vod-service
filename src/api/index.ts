import { Router } from 'express'
import { authRouter } from './routes/auth'
import { omdbRouter } from './routes/omdb'

import { filmRouter } from './routes/film/film'
import { filmAdminRouter } from './routes/film/film.admin'


export const routes = () => {
	const app = Router()
	authRouter(app),
	omdbRouter(app),
	filmRouter(app),
	filmAdminRouter(app)

	return app
}