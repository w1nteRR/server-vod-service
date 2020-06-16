import { Types } from "mongoose"

import { IWatchContinue } from "../../interfaces/ILibrary"
import Library from "../../models/Library"

export function watchContinue () {
    return {
        add: async (data: IWatchContinue) => {
            
            const { filmId, userId, time } = data   
            
            const candidate = {
                filmId: Types.ObjectId(filmId),
                time
            }

            try {

                await Library.updateOne({
                    userId: Types.ObjectId(userId)
                }, 
                {
                    $push: {
                        watchContinue: candidate
                    }
                })
                

            } catch (err) {
                return new Error(err)
            }
        },
        
        getMy: async (userId: string) => {
            try {

                const watchContinue = await Library.aggregate([
                    {
                        $match: {
                            userId: Types.ObjectId(userId)
                        }
                    },
                    {
                        $lookup: {
                            from: 'films',
                            localField: 'watchContinue.filmId',
                            foreignField: '_id',
                            as: 'list'
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            watchContinue: 1,
                            list: {
                                name: 1,
                                _id: 1,
                                img: 1
                            }
                        }
                    }
                ])

                return watchContinue
                
            } catch (err) {
                return new Error(err)
            }
        }
    }
}