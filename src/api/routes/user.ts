import { Router, Request, Response } from 'express'
import { UserService } from '../../services/user.service'


const router = Router()

export const userRouter = (app: Router) => {
    app.use('/', router)

    router.get('/user/:userId', async(req: Request, res: Response) => {
        try {
           
            const user = await UserService().me(req.params.userId)
    
            return res.status(200).json({
                data: {
                    user
                }
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}