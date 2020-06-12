import { Router, Request, Response } from 'express'
import { OmdbService } from '../../services/ombd.service'

const router = Router()

export const omdbRouter = (app: Router) => {
    app.use('/', router)

    router.get('/omdb/film/:id', async(req: Request, res: Response) => {
        try {
            const film = await OmdbService().getFilmById(req.params.id)

            return res.status(200).json(film)

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/omdb/rating/:filmName', async(req: Request, res: Response) => {
        try {
            const film = await OmdbService().getOmdbRating(req.params.filmName)

            return res.status(200).json(film)

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}