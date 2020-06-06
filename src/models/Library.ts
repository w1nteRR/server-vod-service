import mongoose, { Schema, Document } from 'mongoose'
import { ILibrary } from '../interfaces/ILibrary'

const LibrarySchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId, 
		required: true, 
		unique: true
	},
	liked: { 
		type: Array, 
		required: false
	},
	watchLater: { 
		type: Array,
		required: false

    },
    playlists: {
		type: Array,
		required: false
	},
	watchContinue: {
		type: Array,
		required: false
	},
	dislikes: {
		type: Array,
		required: false
	}
}, {
    timestamps: true
})

export default mongoose.model<ILibrary & Document>('Library', LibrarySchema)
