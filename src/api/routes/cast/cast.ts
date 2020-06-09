import { Router, Response, Request } from 'express'
import { CastService } from '../../../services/cast.service'

const router = Router()

export const castRouter = (app: Router) => {
    app.use('/', router)

    router.get('/actor/:id', async (req: Request, res: Response) => {
        try {

            const actor = await CastService().getActorById(req.params.id)

            if(!actor) {
                return res.status(400).json({
                    message: 'Actor not found'
                })
            }

            return res.status(200).json({
                message: 'Actor',
                data: {
                    actor
                }
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/cast', async (req: Request, res: Response) => {
        try {

            const cast = await CastService().getCast()

            return res.status(200).json({
                message: 'Cast',
                data: {
                    cast
                }
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}