const { Schema, model } = require('mongoose')

const schema = new Schema({
	userId: {
		type: Schema.Types.ObjectId, 
		required: true, 
		unique: true
	},
	liked: { 
		type: Array, 
		required: false
	},
	watchLater: { 
		type: Array,
		required: false

    },
    playlists: {
		type: Array,
		required: false
	},
	watchContinue: {
		type: Array,
		required: false
	},
	dislikes: {
		type: Array,
		required: false
	}
}, {
    timestamps: true
})

module.exports = model('UserPlaylist', schema)