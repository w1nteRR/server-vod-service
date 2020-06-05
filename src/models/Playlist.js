const { Schema, model } = require('mongoose')

const schema = new Schema({
	name: {
		type: String, 
		required: true, 
		unique: true
	},
    films: {
		type: Array,
		required: false
    },
    owner: {
        type: String, 
        required: false
    }
},
    {
        timestamps: true
    }
)

module.exports = model('Playlist', schema)