import Library from "../../models/Library"
import { Types } from "mongoose"

export function liked () {
    return {
        getLiked: async (userId: string) => {
            try {

                const liked = await Library.aggregate([
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
                            as: 'likedLook'
                        }
                    },
                    {
                        $project: {
                            likedLook: {
                                name: 1,
                                img: 1,
                                _id: 1
                            }
                        }
                    }
                ])

                return liked[0].likedLook

            } catch (err) {
                return new Error(err)
            }
        }
    }
}