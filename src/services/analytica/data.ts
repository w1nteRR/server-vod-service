import { Types } from "mongoose"

import Library from "../../models/Library"

export const getLikedFilms = async (userId: string) => {
    try {

        const likedFilms = await Library.aggregate([
            {
                $match: {
                    userId: Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'films',
                    localField: 'liked',
                    foreignField: '_id',
                    as: 'liked',
                }
            },
            // {
            //     $lookup: {
            //         from: 'actors',
            //         localField: 'liked._id',
            //         foreignField: 'films._id',
            //         as: 'cast'
            //     }
            // }
            {
                $project: {
                    _id: 0,
                    liked: {
                        name: 1,
                        tags: 1,
                        genr: 1,
                        company: 1
                    },
                    // cast: {
                    //     actorName: 1
                    // }
                }
            }
        ])

        return likedFilms[0]

    } catch (err) {
        return new Error(err)
    }
}