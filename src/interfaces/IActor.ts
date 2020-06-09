import { Types } from "mongoose";

export interface IActor {
    actorName: string,
    films: Array<IActorFilms>
}

interface IActorFilms {
    actorRole: string,
    img: string,
    _id: Types.ObjectId
}

export interface IActorCreate {
    actorName: string,
    actorRole: string,
    filmId: string
}