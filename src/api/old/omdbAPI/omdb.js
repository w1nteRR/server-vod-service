const { Router } = require('express')
const fetch = require('node-fetch')
const config = require('config')

const router = Router()

router.get('/get/:id', async(req, res) => {


    try {
        fetch(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${config.get('omdbAPI')}`)
            .then(res => res.json())
            .then(json => res.status(200).json(json))
    }
    
    catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/rating/:filmName', async(req, res) => {
    try {
        fetch(`http://www.omdbapi.com/?t=${req.params.filmName}&apikey=${config.get('omdbAPI')}`)
            .then(res => res.json())
            .then(json => res.status(200).json({
                imdb: json.imdbRating,
                metascore: json.Metascore,
                imdbVotes: json.imdbVotes
            }))
    }
    
    catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router