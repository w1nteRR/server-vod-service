import { Router, Request, Response } from 'express'

import { FilmService } from '../../../services/film.service'

import { IFilmCreate } from '../../../interfaces/IFilm'

const router = Router()

export const filmAdminRouter = (app: Router) => {
    app.use('/admin/film', router)

    router.post('/create', async (req: Request, res: Response) => {
        try {

            await FilmService().create(req.body as IFilmCreate)
            
            return res.status(201).json({
                message: 'Film created'
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.delete('/:id/delete', async (req: Request, res: Response) => {
        try {
            await FilmService().delete(req.params.id)
            return res.status(200).json({
                message: 'Film deleted'
            })
        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.put('/:id/update', async (req: Request, res: Response) => {
        try {
            
            await FilmService().update(req.params.id, req.body)
            
            return res.status(200).json({
                message: 'Film updated'
            })
        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}



