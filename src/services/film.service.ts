import fs from 'fs'
import { Types } from 'mongoose'

import { IFilmCreate } from '../interfaces/IFilm'

import Film from '../models/Film'
import Rating from '../models/Rating'

export function FilmService () {
    return {
        ...filmManage(),
        ...filmGet()
    }
}

function filmManage () {
    return {
        create: async (candidate: IFilmCreate) => {
            try {

                const newFilm = new Film({
                    ...candidate
                })
                
                await newFilm.save()
                await newFilm.updateOne({ 
                    $set: {
                        img: `/static/${newFilm._id}/poster.jpg`,
                        wallpaper: `/static/${newFilm._id}/wallpaper.jpg`
                    }
                })

                await new Rating({ filmId: newFilm._id }).save()
                
                await fs.promises.mkdir(`public/${newFilm._id}`)

            } catch (err) {
                throw new Error(err)
            }
        },

        delete: async (_id: string) => {
            try {

                await Film.findByIdAndRemove(_id)
                await Rating.deleteOne({ filmId: Types.ObjectId(_id) })
                await fs.promises.rmdir(`public/${_id}`)

            } catch (err) {
                throw new Error(err)
            }
        },

        update: async (_id: string, film: IFilmCreate) => {
            try {

                await Film.findByIdAndUpdate(_id, {...film})

            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

function filmGet () {
    return {
        getById: async (_id: string) => {
            try {
                const film = await Film.aggregate([
                    {
                        $match: {
                          _id: Types.ObjectId(_id)
                        }
                    },
                    {
                        $lookup: {
                            from: 'actors',
                            let: {
                                id: Types.ObjectId(_id)
                            },
                            pipeline: [
                                { $unwind: "$films" },
                                { $match: { $expr: { $eq: [ "$films._id",  "$$id" ] }, }},
                            ],
                            as: 'cast'
                    }
                }
            ])

            const projection = { 
                _id: 1,
                img: 1,
                name: 1
            }
            const similar = await Film.find({
                tags: {
                    $in: film[0].tags
                }
            }, projection)

            const filtredSimilar = similar.filter(similar => similar.name !== film[0].name)                

            return {
                film,
                similar: filtredSimilar
            }

            } catch (err) {
                throw new Error(err)
            }
        },
        getAll: async () => {
            const projection = {
                _id: 1,
                name: 1,
                describe: 1,
                img: 1,
                type: 1
            }

            try {
            
                const films = await Film.find({}, projection)

                return films

            } catch (err) {
                throw new Error(err)
            }
        }
    }
}
