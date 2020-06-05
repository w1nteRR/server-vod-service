import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from '../interfaces/IUser'

const UserSchema: Schema = new Schema({
	email: {
		type: String, 
		required: true, 
		unique: true
	},
	password: { 
		type: String, 
		required: true 
	},
	username: {
		type: String,
		required: true
	},
	role: { 
		type: String,
	}
}, 
	{
		timestamps: true
	}
)

export default mongoose.model<IUser & Document>('User', UserSchema)