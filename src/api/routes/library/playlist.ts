import { Request, Response, Router } from 'express'

import { PlaylistService } from '../../../services/library/playlist.service'
import { IPlaylistManage } from '../../../interfaces/ILibrary'

const router = Router()

export const playlistRouter = (app: Router) => {
    app.use('/library', router)
    
    router.post('/playlist/create', async (req: Request, res: Response) => {
        try {

            const playlist =  await PlaylistService().playlistManage(req.body as IPlaylistManage).create()
            
            if(playlist?.message) {
                return res.status(400).json({
                    message: playlist.message
                })
            }
            
            return res.status(201).json({
                message: 'Playlist created'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.put('/playlist/remove', async (req: Request, res: Response) => {
        try {
            
            const playlist= await PlaylistService().playlistManage(req.body as IPlaylistManage).remove()
        
            if(playlist?.message) {
                return res.status(400).json({
                    message: playlist.message
                })
            }

            return res.status(200).json({
                message: 'Playlist removed'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/playlist/edit', async (req: Request, res: Response) => {
        try {
            
            const playlist = await PlaylistService().playlistManage(req.body as IPlaylistManage).editName()
        
            if(playlist?.message) {
                return res.status(400).json({
                    message: playlist.message
                })
            }

            return res.status(200).json({
                message: 'Playlist name changed'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.put('/playlist/add-film', async (req: Request, res: Response) => {
        try {
            
            const playlist = await PlaylistService().playlistManage(req.body as IPlaylistManage).addFilm()
        
            if(playlist?.message) {
                return res.status(400).json({
                    message: playlist.message
                })
            }

            return res.status(200).json({
                message: 'Film added'
            })


        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.get('/playlist/:userId', async (req: Request, res: Response) => {
        try {

            const playlists = await PlaylistService().playlistGet().userPlaylists(req.params.userId)

            if(playlists instanceof Error) {
                return res.status(400).json({
                    message: playlists.message
                })
            }
            
            return res.status(200).json(playlists)

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })

    router.post('/playlist/get-single', async (req: Request, res: Response) => {
        try {

            const playlist = await PlaylistService().playlistGet().singlePlaylist(req.body)
            
            return res.status(200).json({
                data: {
                    playlist
                }
            })

        } catch (err) {
            res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}