import { Router, Request, Response } from 'express'

import { SearchService } from '../../services/search.service'
import { ISearchFilter } from '../../interfaces/ISearch'

const router = Router()

export const searchRouter = (app: Router) => {
    app.use('/', router)

    router.get('/search/film/:value', async(req: Request, res: Response) => {
        try {
           
            const films = await SearchService().findFilm().byName(req.params.value)
    
            if(films instanceof Error) {
                return res.status(400).json({
                    message: films.message
                })
            }
           
            return res.status(200).json({
                films
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/search/film/filter', async(req: Request, res: Response) => {
        try {

            const films = await SearchService().findFilm().byFilter(req.body as ISearchFilter)
            
            if(films instanceof Error) {
                return res.status(400).json({
                    message: films.message
                })
            }

            return res.status(200).json({
                films
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/search/cast/actor/:value', async (req: Request, res: Response) => {
        try {

            const actors = await SearchService().findCast().byName(req.params.value)
            
            if(actors instanceof Error) {
                return res.status(400).json({
                    message: actors.message
                })
            }

            return res.status(200).json({
                actors
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}