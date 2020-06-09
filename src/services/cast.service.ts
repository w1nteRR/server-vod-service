import { Types } from "mongoose"

import { IActorManage, IActor, IActorRole } from "../interfaces/IActor"

import Actor from '../models/Actor'

export function CastService () {

    return {
        castManage,
        ...castGet()
    }
}

function castManage (actor: IActorManage) {
    return {
        createActor: async () => {
            const actorCandidateCreate: IActor = {
                actorName: actor.actorName,
                films: [
                    {
                        actorRole: actor.actorRole,
                        img: `/static/${actor.filmId}/${actor.actorName.replace(/ /g, '_')}.jpg`,
                        _id: Types.ObjectId(actor.filmId)
                    }
                ]
            }

            try {

                const isActorExists = await Actor.findOne({ actorName: actor.actorName })
                if(isActorExists) return new Error('Actor exists already')

                await new Actor(actorCandidateCreate).save() 

            } catch(err) {
                return new Error(err)
            }
        },

        addRole: async () => {
            const actorRole: IActorRole = {
                actorRole: actor.actorRole,
                _id: Types.ObjectId(actor.filmId),
                img: `/static/${actor.filmId}/${actor.actorName.replace(/ /g, '_')}.jpg`
            }

            try {

                const isRoleExists = await Actor.findOne({
                    _id: Types.ObjectId(actor.actorId),
                    'films._id': Types.ObjectId(actor.filmId)
                })
                if(isRoleExists) return new Error('Role already exists')
                
                await Actor.updateOne(
                    {
                        _id: Types.ObjectId(actor.actorId)
                    },
                    {
                        $push: {
                            films: actorRole
                        }
                    }
                )

            } catch (err) {
                return new Error(err)
            }
        },

        removeRole: async () => {
            try {
                
                await Actor.updateOne(
                    {
                        _id: Types.ObjectId(actor.actorId),
                        'films._id': Types.ObjectId(actor.filmId)
                    },
                    {
                        $pull: {
                            films: {
                                _id: Types.ObjectId(actor.filmId)
                            }
                        }
                    }
                )

            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function castGet () {
    return {
        getActorById: async (actorId: string) => {
            try {

                const actor = await Actor.findOne({ _id: Types.ObjectId(actorId) })
                
                return actor

            } catch (err) {
                return new Error(err)
            }
        },

        getCast: async () => {
            try {

                const cast = await Actor.find({})
                return cast

            } catch (err) {
                return new Error(err)
            }
        }
    }
}