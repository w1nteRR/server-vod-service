import { Types } from "mongoose"

import { IAnalisedData } from "../../interfaces/IAnalytica"
import { IPlaylist, IPlaylistManage } from "../../interfaces/IPlaylist"

import Film from "../../models/Film"
import Playlist from "../../models/Playlist"

import '../../utils/prototypes'

export function PlaylistMadeService () {
    return {
        ...get(),
        recommendation,
        ...merge(),
        ...manage()
    }
}

function manage () {
    return {
        createPlaylist: async (data: IPlaylistManage) => {

            const films = data.films.map(item => Types.ObjectId(item))
            
            try {

                const isNameExists = await Playlist.findOne({ name: data.name })
                
                if(isNameExists) return new Error('Playlist already exists')

                const newPlaylist = new Playlist({ name: data.name, films })

                await newPlaylist.save()
                

            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function get () {
    return {
        getTrends: async () => {
            try {

                const trends = await Playlist.aggregate([
                    {
                        $match: {
                            name: 'Trends'
                        }
                    },
                    {
                        $lookup: {
                            from: 'films',       
                            localField: 'films',   
                            foreignField: '_id', 
                            as: 'trends'         
                        }   
                    },
                    {
                        $project: {
                            trends: {
                                name: 1,
                                img: 1,
                                wallpaper: 1,
                                describe: 1,
                                _id: 1
                            }
                        }
                    }
                ])

                const playlist = trends[0].trends.shuffle()
                
                return playlist

            } catch (err) {
                return new Error(err)
            }
        },

        getPlaylists: async (skipVal: number) => {
            try {
                
                const playlists = await Playlist.aggregate([
                    {
                        $match: {
                            $nor: [{
                                name: 'Trends'
                            }]
                        }
                    },
                    {
                        $lookup: {
                            from: 'films',
                            localField: 'films',
                            foreignField: '_id',
                            as: 'films'
                        }
                    },
                    {
                        $project: {
                            name: 1,
                            films: {
                                _id: 1,
                                name: 1,
                                img: 1
                            },
                            data: 1
                        }
                    },
                    {
                        $skip: skipVal
                    },
                    {
                        $limit: 4
                    }
                ])

                if(!playlists.length) return new Error('End')
                
                return playlists

            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function recommendation (analisedData: IAnalisedData) {

    const genrKey = Object.keys(analisedData.genr)
    const genrVal = Object.values(analisedData.genr)
    const tagKey = Object.keys(analisedData.tags)

    return {
        lowAccuracy: async () => {
            try {

                const films = await Film.aggregate([
                    {
                        $match: {
                            name: {
                                $nin: analisedData.films
                            },
                            genr: {
                                $in: genrKey
                            },
                            tags: {
                                $in: tagKey
                            },
                        }
                    },
                    {
                        $project: {
                            name: 1
                        }
                    }
                ])

                const description = `Becouse you was watching ${genrKey} ${genrVal} times`

                const playlist: IPlaylist = {
                    name: 'Recommended',
                    films,
                    description,
                    isRecommended: true,
                    accuracy: 'low'
                }
                
                return playlist
                
            } catch (err) {
                return new Error()
            }
        }
    }
}

function merge () {
    return {
        mergeWithRecommendation: async (recPlaylists: Array<any>) => {
            try {
                
                const playlists: any = await get().getPlaylists(0)

                return recPlaylists.concat(playlists)
                
            } catch (err) {
                return new Error(err)
            }
        }
    }
}