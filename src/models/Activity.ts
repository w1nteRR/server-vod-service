import mongoose, { Schema, Document } from 'mongoose'
import { IActiviy } from '../interfaces/IActivity'

const ActivitySchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId, 
		required: true, 
		unique: true
	},
	history: { 
		type: Array, 
		required: false
	},
	stats: { 
		type: Array,
		required: false
	}
}, {
    timestamps: true
})

export default mongoose.model<IActiviy & Document>('Activity', ActivitySchema)