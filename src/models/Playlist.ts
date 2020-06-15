import mongoose, { Schema, Document } from 'mongoose'

import { IPlaylist } from '../interfaces/IPlaylist'

const PlaylistSchema = new Schema({
	name: {
		type: String, 
		required: true, 
		unique: true
	},
    films: {
		type: Array,
		required: false
    },
    isRecommended: {
        type: Boolean,
        required: false
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model<IPlaylist & Document>('Playlist', PlaylistSchema)
