const { Schema, model } = require('mongoose')

const schema = new Schema({
	filmId: {
		type: Schema.Types.ObjectId, 
		required: true, 
		unique: true
	},
    rating: {
		type: Array,
		required: false
    }
})

module.exports = model('Rating', schema)