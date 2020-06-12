import mongoose, { Schema, Document } from 'mongoose'
import { IRating } from '../interfaces/IRating'

const RatingSchema = new Schema({
	filmId: {
		type: Schema.Types.ObjectId, 
		required: true, 
		unique: true
	},
	likes: {
		type: Array,
		required: true
	},
	dislikes: {
		type: Array,
		required: true
	}
})

export default mongoose.model<IRating & Document>('Rating', RatingSchema)
