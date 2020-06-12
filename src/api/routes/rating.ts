import { Request, Response, Router } from 'express'

import { RatingService } from '../../services/rating.service'
import { IRatingManage } from '../../interfaces/IRating'

const router = Router()

export const ratingRouter = (app: Router) => {
    app.use('/rating', router)

    router.put('/set-like', async (req: Request, res: Response) => {
        try {

            const rating = await RatingService().setLike(req.body as IRatingManage)
            
            if(rating?.message) {
                return res.status(400).json({
                    message: rating.message
                })
            }

            return res.status(200).json({
                message: 'Film added to liked'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.put('/remove-like', async (req: Request, res: Response) => {
        try {

            const rating = await RatingService().removeLike(req.body as IRatingManage)
            
            if(rating?.message) {
                return res.status(400).json({
                    message: rating.message
                })
            }

            return res.status(200).json({
                message: 'Like removed'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.put('/set-dislike', async (req: Request, res: Response) => {
        try {

            const rating = await RatingService().setDislike(req.body as IRatingManage)
            
            if(rating?.message) {
                return res.status(400).json({
                    message: rating.message
                })
            }

            return res.status(200).json({
                message: 'Dislike will affect your recommendations'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.put('/remove-dislike', async (req: Request, res: Response) => {
        try {

            const rating = await RatingService().removeDislike(req.body as IRatingManage)
            
            if(rating?.message) {
                return res.status(400).json({
                    message: rating.message
                })
            }

            return res.status(200).json({
                message: 'Dislike removed'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/status', async (req: Request, res: Response) => {
        try {

            const rating = await RatingService().status(req.body as IRatingManage)
        
            return res.status(200).json({
                rating
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}