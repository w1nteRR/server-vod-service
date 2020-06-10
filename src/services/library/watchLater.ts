import { Types } from 'mongoose'
import { IWatchLaterManage } from "../../interfaces/ILibrary"

import Library from "../../models/Library"

export function watchLater () {
    return {
        ...manage(),
        ...options(),
        ...get()
    }
}

function manage () {
    return {
        add: async (data: IWatchLaterManage) => {
            const { userId, filmId } = data

            try {

                const watchLaterList = await Library.aggregate([
                    {
                        $match: {
                            userId: Types.ObjectId(userId),
                            watchLater: Types.ObjectId(filmId)
                        }
                    }
                ])

                if(watchLaterList.length) return new Error('Film in list already')

                await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId)
                    }, 
                    { 
                        $push: {
                            watchLater: Types.ObjectId(filmId)
                        }
                    })

            } catch (err) {
                return new Error(err)
            }
        },
        remove: async (data: IWatchLaterManage) => {
            const { userId, filmId } = data
            try {
                await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId)
                    }, 
                    { 
                        $pull: {
                            watchLater: Types.ObjectId(filmId) 
                        }
                    })
            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function get () {
    return {
        getList: async (userId: string) => {
            try {
                // const data = await Library.aggregate([
                //     {
                //         $match: {
                //             userId: Types.ObjectId(userId)
                //         }
                //     },
                //     {
                //         $lookup: {
                //             from: 'films',
                //             localfield: 'watchLater',
                //             foreignField: '_id',
                //             as: 'list'
                //         }
                //     }
                // ])
                // console.log(data)
            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function options () {
    return {
        status: async (data: IWatchLaterManage) => {
            const { userId, filmId } = data
            try {

                const watchLater = await Library.aggregate([
                    {
                        $match: {
                            userId: Types.ObjectId(userId),
                            watchLater: Types.ObjectId(filmId)
                        }
                    }
                ])

                if(watchLater.length) return true

                return false

            } catch (err) {
                return new Error(err)
            }
        }
    }
}