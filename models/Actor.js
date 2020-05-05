const { Schema, model } = require('mongoose')

const schema = new Schema({
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

module.exports = model('Actor', schema)