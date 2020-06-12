import { Types } from 'mongoose'

import { IRatingManage } from "../interfaces/IRating"

import Rating from '../models/Rating'
import Library from '../models/Library'

export function RatingService () {
    return {
        ...ratingControl(),
        ...options()   
    }
}

function ratingControl () {
    return {
        setLike: async (data: IRatingManage) => {

            const { userId, filmId } = data

            try {

                const isLiked = await Library.aggregate([
                    {
                        $match: {
                            userId: Types.ObjectId(userId),
                            liked: Types.ObjectId(filmId)
                        }
                    }
                ])
                
                if(isLiked.length) return new Error('Film liked already')

                await Library.updateOne({ 
                    userId: Types.ObjectId(userId)
                }, 
                    { $push: { liked: Types.ObjectId(filmId) }
                })

                const res = await Rating.updateOne(
                    { 
                        filmId: Types.ObjectId(filmId)
                    }, 
                    { $push: {likes: Types.ObjectId(userId) }
                })

            } catch (err) {
                return new Error(err)
            }
        },

        removeLike: async (data: IRatingManage) => {
            const { userId, filmId } = data

            try {

                await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId)
                    }, 
                    { $pull: { liked: Types.ObjectId(filmId) }
                })
        
                await Rating.updateOne(
                    { 
                        filmId: Types.ObjectId(filmId)
                    }, 
                    { $pull: {likes: Types.ObjectId(userId) }
                })

            } catch (err) {
                return new Error(err)
            }
        },

        setDislike: async (data: IRatingManage) => {
            
            const { userId, filmId } = data

            try {

                const isDisliked = await Library.aggregate([
                    {
                        $match: {
                            userId: Types.ObjectId(userId),
                            dislikes: Types.ObjectId(filmId)
                        }
                    }
                ])

                if(isDisliked.length) return new Error('Film disliked already')

                await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId)
                    }, 
                    { $push: {dislikes: Types.ObjectId(filmId) }
                })
        
                await Rating.updateOne(
                    { 
                        filmId: Types.ObjectId(filmId)
                    }, 
                    { $push: {dislikes: Types.ObjectId(userId) }
                })

            } catch (err) {
                return new Error(err)
            }
        },
        removeDislike: async (data: IRatingManage) => {
            const { userId, filmId } = data

            try {

                await Library.updateOne(
                    { 
                        userId: Types.ObjectId(userId)
                    }, 
                    { $pull: {dislikes: Types.ObjectId(filmId) }
                })
        
                await Rating.updateOne(
                    { 
                        filmId: Types.ObjectId(filmId)
                    }, 
                    { $pull: {dislikes: Types.ObjectId(userId) }
                })

            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function options () {
    return {
        status: async (data: IRatingManage) => {

            const { filmId, userId } = data

            try {

                const likedList = await Library.aggregate([
                    {
                        $match: {
                            userId: Types.ObjectId(userId),
                            liked: Types.ObjectId(filmId)
                        }
                    }
                ])

                const dislikedList = await Library.aggregate([
                    {
                        $match: {
                            userId: Types.ObjectId(userId),
                            dislikes: Types.ObjectId(filmId)
                        }
                    }
                ])

                if(likedList.length) return { status: 'like' }
                if(dislikedList.length) return { status: 'dislike' }

                return {
                    status: null
                }

            } catch (err) {
                return new Error(err)
            }
        }
    }
}