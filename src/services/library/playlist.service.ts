import { Types } from 'mongoose'

import { IPlaylist, IPlaylistManage } from '../../interfaces/ILibrary'
import Library from '../../models/Library'

export function PlaylistService () {

    return {
        playlistManage,
        playlistGet
    }
}

function playlistManage (data: IPlaylistManage) {

    const { userId, playlistName, playlistId, filmId } = data

    return {
        create: async () => {

            const playlist: IPlaylist = {
                id: Types.ObjectId(),
                playlistName: playlistName,
                films: []
            }

            try {

                if(!playlist.playlistName.trim()) return new Error('Playlist name cant be empty')

                const isPlaylistNameExists = await Library.find({
                    playlists: {
                        $elemMatch: {
                            playlistName: playlistName
                        }
                    }
                })

                if(isPlaylistNameExists.length) return new Error(`Playlist ${playlistName} already exists`)

                await Library.updateOne({
                    userId: Types.ObjectId(userId)
                }, {
                    $push: {
                        playlists: playlist
                    }
                })
                            

            } catch (err) {
                return new Error(err)
            }
        },
        remove: async () => {
            try {
                const playlistRmRes = await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId),
                        'playlists.id': Types.ObjectId(playlistId)
                    }, 
                    { 
                        $pull: {
                            playlists: {
                                id: Types.ObjectId(playlistId)
                        }
                    }
                })

                if(playlistRmRes.n === 0) return new Error('Remove error')

            } catch (err) {
                return new Error(err)
            }
        },
        editName: async () => {      
            try {
                if(!playlistName.trim()) return new Error('Playlist name cant be empty')

                const updatedPlaylist = await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId),
                        'playlists.id': Types.ObjectId(playlistId)
                    }, 
                    { $set: {'playlists.$.playlistName': playlistName }
                })

                if(updatedPlaylist.n === 0) return new Error('Wrong playlist id')

            } catch (err) {
                return new Error(err)
            }
        },
        addFilm: async () => {
            try {
                const isPlaylistExists = await Library.findOne({
                    userId: Types.ObjectId(userId),
                    playlists: {
                        $elemMatch: {
                            id: Types.ObjectId(playlistId),
                            films: {
                                $elemMatch: {
                                    _id: Types.ObjectId(filmId)}
                                }
                            }
                        }
                    })

                if(isPlaylistExists) return new Error('Film in playlist already')
                
                await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId),
                        'playlists.id': Types.ObjectId(playlistId)
                    }, 
                    { $push: {'playlists.$.films': {
                        _id: Types.ObjectId(filmId),
                        img: `/static/${filmId}/poster.jpg`
                    }}
                })

            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function playlistGet () {

    return {
        userPlaylists: async (userId: string) => {
            try {
                const playlists = await Library.findOne({
                    userId: Types.ObjectId(userId)
                }, { playlists: 1 })

                return playlists

            } catch (err) {
                return new Error(err)
            }
        },
        singlePlaylist: async (data: IPlaylistManage) => {
            const { userId, playlistId } =  data
            try {
                const playlist = await Library.findOne(
                    {
                        userId: Types.ObjectId(userId),
                        'playlists.id': Types.ObjectId(playlistId)
                    }, 
                    {
                        'playlists.$.id': Types.ObjectId(playlistId)
                    })
                
                return playlist?.playlists[0]
        
            } catch (err) {
                return new Error(err)
            }
        }
    }
}