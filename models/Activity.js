const { Schema, model } = require('mongoose')

const schema = new Schema({
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

module.exports = model('Activity', schema)