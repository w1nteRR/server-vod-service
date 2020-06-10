import { Types } from 'mongoose'

export interface ILibrary {
    userId: Types.ObjectId,
    liked: Array<object>,
    watchLater: Array<object>,
    playlists: Array<object>,
    watchContinue: Array<object>,
	dislikes: Array<object>
}

export interface IPlaylist {
    id: Types.ObjectId,
    playlistName: string,
    films: Array<object>
}

export interface IPlaylistManage {
    userId: string,
    playlistName: string,
    playlistId: string,
    filmId: string
}