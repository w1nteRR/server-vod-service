import { Router, Request, Response } from 'express'

import { FilmService } from '../../../services/film.service'

const router = Router()

export const filmRouter = (app: Router) => {
    app.use('/', router)

    router.get('/film/:id', async (req: Request, res: Response) => {
        try {

            const { film, similar } = await FilmService().getById(req.params.id)
            
            return res.status(200).json({
                message: "Film found",
                film,
                similar
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/films', async (req: Request, res: Response) => {
        try {

            const films = await FilmService().getAll()
            return res.status(200).json({
                message: 'Films found',
                films
            })
            
        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/film/rating/:id', async (req: Request, res: Response) => {
        try {

            const rating = await FilmService().getRating(req.params.id)

            if(rating instanceof Error) {
                return res.status(400).json({
                    message: rating.message
                })
            }
            
            return res.status(200).json({
                message: 'Rating',
                rating
                    
            })
            
        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}



