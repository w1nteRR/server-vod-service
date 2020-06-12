import { Request, Response, Router } from 'express'
import { LibraryService } from '../../../services/library.service'
import { IWatchLaterManage } from '../../../interfaces/ILibrary'

const router = Router()

export const watchLaterRouter = (app: Router) => {
    app.use('/library/watch-later', router)

    router.put('/add', async (req: Request, res: Response) => {
        try {

            const watchLater = await LibraryService().watchLater().add(req.body as IWatchLaterManage)

            if(watchLater?.message) {
                return res.status(400).json({
                    message: watchLater.message
                })
            }
            
            return res.status(201).json({
                message: 'Film added to watch later'
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.put('/remove', async (req: Request, res: Response) => {
        try {

            const watchLater = await LibraryService().watchLater().remove(req.body as IWatchLaterManage)

            if(watchLater?.message) {
                return res.status(400).json({
                    message: watchLater.message
                })
            }
            
            return res.status(200).json({
                message: 'Film removed from watch later'
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/status', async (req: Request, res: Response) => {
        try {

            const isWatchLater = await LibraryService().watchLater().status(req.body as IWatchLaterManage)

            if(isWatchLater) {
                return res.status(200).json({
                    watchLater: true   
                })
            } else {
                return res.status(200).json({
                    watchLater: false
                })
            }

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/:userId', async (req: Request, res: Response) => {
        try {

            const watchLaterList = await LibraryService().watchLater().getList(req.params.userId)

            return res.status(200).json({
                watchLaterList
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}