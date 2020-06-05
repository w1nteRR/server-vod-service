import { Router } from 'express'
import { authRouter } from './routes/auth'

export const routes = () => {
	const app = Router()
	authRouter(app)

	return app
}