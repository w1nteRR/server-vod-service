import { Types } from "mongoose";

export interface IActor {
    actorName: string,
    films: Array<IActorRole>
}

export interface IActorManage {
    actorId: string,
    actorName: string,
    actorRole: string,
    filmId: string
}

export interface IActorRole {
    actorRole: string,
    img: string,
    _id: Types.ObjectId
}



