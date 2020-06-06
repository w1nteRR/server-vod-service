import fs from 'fs'
import { Types } from 'mongoose'

import { IFilmCreate } from '../interfaces/IFilm'

import Film from '../models/Film'
import Rating from '../models/Rating'

export function FilmService () {
    return {
        ...filmManage()
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
