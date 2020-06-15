import { Router, Request, Response } from 'express'
import { UserService } from '../../../services/users/user.service'


const router = Router()

export const userAdminRouter = (app: Router) => {
    app.use('/', router)

    router.get('/admin/users', async(req: Request, res: Response) => {
        try {
           
            const users = await UserService().users()
    
            return res.status(200).json({
                users
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}