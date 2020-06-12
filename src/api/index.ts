import { Router } from 'express'

import { authRouter } from './routes/auth'
import { omdbRouter } from './routes/omdb'
import { filmRouter } from './routes/film/film'
import { castRouter } from './routes/cast/cast'

import { filmAdminRouter } from './routes/film/film.admin'
import { castAdminRouter } from './routes/cast/cast.admin'
import { searchRouter } from './routes/search'
import { playlistRouter } from './routes/library/playlist'
import { watchLaterRouter } from './routes/library/watchLater'
import { likedRouter } from './routes/library/liked'
import { ratingRouter } from './routes/rating'
import { userRouter } from './routes/user'

export const routes = () => {
	const app = Router()
	authRouter(app)
	omdbRouter(app)
	filmRouter(app)
	castRouter(app)
	searchRouter(app)
	playlistRouter(app)
	watchLaterRouter(app)
	likedRouter(app)
	ratingRouter(app)
	userRouter(app)
	
	filmAdminRouter(app)
	castAdminRouter(app)

	return app
}