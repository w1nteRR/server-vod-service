export interface IPlaylist {
    name: string,
    films: Array<string>,
    isRecommended: Boolean,
    description: string,
    accuracy: string
}

export interface IPlaylistManage {
    name: string,
    films: Array<string>
}