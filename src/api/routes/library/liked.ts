import { Request, Response, Router } from 'express'

import { LibraryService } from '../../../services/library.service'

const router = Router()

export const likedRouter = (app: Router) => {
    app.use('/library', router)
    
    router.get('/liked/:userId', async (req: Request, res: Response) => {
        try {

            const liked = await LibraryService().liked().getLiked(req.params.userId)
            
            return res.status(200).json({
                data: {
                    liked
                }
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}