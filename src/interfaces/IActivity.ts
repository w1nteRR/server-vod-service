import { Types } from 'mongoose'

export interface IActiviy {
    userId: Types.ObjectId,
    history: Array<object>,
    stats: Array<object>
}