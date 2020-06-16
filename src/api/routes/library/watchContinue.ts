import { Request, Response, Router } from 'express'

import { LibraryService } from '../../../services/library.service'
import { IWatchContinue } from '../../../interfaces/ILibrary'

const router = Router()

export const watchContinueRouter = (app: Router) => {
    app.use('/library/watch-continue', router)
    
    router.put('/add', async (req: Request, res: Response) => {
        try {

            await LibraryService().watchContinue().add(req.body as IWatchContinue)
            
        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/:userId', async (req: Request, res: Response) => {
        try {

            const watchContinue = await LibraryService().watchContinue().getMy(req.params.userId)

            return res.status(200).json(watchContinue)

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            }) 
        }
    })
}