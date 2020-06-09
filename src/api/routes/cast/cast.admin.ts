import { Router, Request, Response } from 'express'

import { CastService } from '../../../services/cast.service'
import { IActorManage } from '../../../interfaces/IActor'

const router = Router()

export const castAdminRouter = (app: Router) => {
    app.use('/admin/cast', router)

    router.post('/createActor', async(req: Request, res: Response) => {
        try {

            const cast = await CastService().castManage(req.body as IActorManage).createActor()
            
            if(cast?.message) {
                return res.status(400).json({
                    message: cast.message
                })
            }
        
            return res.status(201).json({
                message: 'Actor created'
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/addRole', async(req: Request, res: Response) => {
        try {

            const cast = await CastService().castManage(req.body as IActorManage).addRole()
            
            if(cast?.message) {
                return res.status(400).json({
                    message: cast.message
                })
            }
        
            return res.status(201).json({
                message: 'Role added'
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/removeRole', async(req: Request, res: Response) => {
        try {

            const cast = await CastService().castManage(req.body as IActorManage).removeRole()
            
            if(cast?.message) {
                return res.status(400).json({
                    message: cast.message
                })
            }
        
            return res.status(200).json({
                message: 'Role removed'
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}