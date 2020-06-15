import { Request, Response, Router } from 'express'
import multer from 'multer'

import { posterConfig } from '../../../config/multer'

const router = Router()

const upload = multer({ 
    storage: posterConfig
})

export const uploadRouter = (app: Router) => {
    app.use('/upload', router)
    
    router.post('/film/poster/:filmId', upload.single('image'), async (req: Request, res: Response) => {
        try {

            if(!req.file) {
                return res.status(404).json({
                    message: 'No file'
                })
            }

            res.status(200).json({
                message: 'File has uploaded'
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}