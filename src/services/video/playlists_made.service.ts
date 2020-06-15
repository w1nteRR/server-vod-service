import Playlist from "../../models/Playlist"

import '../../utils/prototypes'

export function PlaylistMadeService () {
    return {
        ...get()
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
                                describe: 1
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
                        $project: {
                            name: 1,
                            films: 1
                        }
                    },
                    {
                        $skip: skipVal
                    },
                    {
                        $limit: 4
                    }
                ])
                
                return playlists

            } catch (err) {
                return new Error(err)
            }
        }
    }
}
