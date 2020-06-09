import { Router } from 'express'

import { authRouter } from './routes/auth'
import { omdbRouter } from './routes/omdb'
import { filmRouter } from './routes/film/film'
import { castRouter } from './routes/cast/cast'

import { filmAdminRouter } from './routes/film/film.admin'
import { castAdminRouter } from './routes/cast/cast.admin'
import { searchRouter } from './routes/search'

export const routes = () => {
	const app = Router()
	authRouter(app),
	omdbRouter(app),
	filmRouter(app),
	castRouter(app),
	searchRouter(app),
	
	filmAdminRouter(app),
	castAdminRouter(app)

	return app
}