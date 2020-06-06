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
		required: false
	},
	dislikes: {
		type: Array,
		required: false
	}
})

export default mongoose.model<IRating & Document>('Rating', RatingSchema)
