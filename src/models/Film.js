const { Schema, model } = require('mongoose')

const schema = new Schema({
	name: {
		type: String, 
		required: true, 
		unique: true
	},
	year: { 
		type: Number, 
		required: true 
	},
	genr: { 
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    audio: {
        type: Array,
        required: true
    },
    subtitles: {
        type: Array,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    series: {
        type: Array,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    wallpaper: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    }
)

module.exports = model('Film', schema)