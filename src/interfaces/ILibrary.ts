import { Types } from 'mongoose'

export interface ILibrary {
    userId: Types.ObjectId,
    liked: Array<object>,
    watchLater: Array<object>,
    playlists: Array<object>,
    watchContinue: Array<object>,
	dislikes: Array<object>
}