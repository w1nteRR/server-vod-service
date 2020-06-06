import { Router, Request, Response } from 'express'
import { OmdbService } from '../../services/ombd.service'

const router = Router()

export const omdbRouter = (app: Router) => {
    app.use('/omdb', router)

    router.get('/film/:id', async(req: Request, res: Response) => {
        try {
            const film = await OmdbService().getFilmById(req.params.id)

            return res.status(200).json(film)

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}