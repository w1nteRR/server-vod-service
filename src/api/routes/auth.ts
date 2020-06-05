import { Router, Request, Response } from 'express'
import { Auth } from '../../services/auth'
import { IUserSignUp, IUserSignIn } from '../../interfaces/IUser'

const router = Router()

export const authRouter = (app: Router) => {
    app.use('/auth', router)

    router.post('/signin', async (req: Request, res: Response) => {
        try {
            const { token, user } = await Auth().signin(req.body as IUserSignIn)
            
            return res.status(200).json({
                message: 'Sign in ok',
                token,
                user
            })
    
        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/signup', async (req: Request, res: Response) => {
        try {
    
            await Auth().signup(req.body as IUserSignUp)
            res.status(200).json({
                message: 'Sign up ok'
            })
    
        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}



