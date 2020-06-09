import mongoose, { Schema, Document } from 'mongoose'
import { IActor } from '../interfaces/IActor'

const ActorSchema = new Schema({
	actorName: {
		type: String, 
		required: true, 
		unique: true
	},
    films: {
		type: Array,
		required: false
    }
})

export default mongoose.model<IActor & Document>('Actor', ActorSchema)