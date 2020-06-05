const { Schema, model } = require('mongoose')

const schema = new Schema({
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

module.exports = model('User', schema)