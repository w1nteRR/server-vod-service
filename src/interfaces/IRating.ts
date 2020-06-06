import { Types } from 'mongoose'

export interface IRating {
    filmId: Types.ObjectId,
    likes: Array<Types.ObjectId>,
    dislikes: Array<Types.ObjectId>
}