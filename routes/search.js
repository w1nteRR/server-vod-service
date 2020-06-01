const { Router } = require('express')

const Film = require('../models/Film')
const Actor = require('../models/Actor')

const router = Router()

router.get('/search/:text', async(req, res) => {
    
    try {
        let pattern = `${req.params.text}`;
        let regex = new RegExp(`${pattern}`, 'i')

        if(req.params.text.length < 3) {
            return res.status(400).json({
                message: '3 char +'
            })
        }

        const films = await Film.find(
            { 
                name: regex 
            },
            {
                name: 1,
                img: 1,
            }
        )
             
        res.status(200).json({
            message: 'Search ok',
            films
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/search/actors/:text', async(req, res) => {

    try {
        let pattern = `${req.params.text}`;
        let regex = new RegExp(`${pattern}`, 'i')

        if(req.params.text.length < 3) {
            return res.status(400).json({
                message: '3 char +'
            })
        }
        const actors = await Actor.find({ actorName: regex })
                
        res.status(200).json({
            message: 'Search ok',
            data: actors
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.post('/search/tags', async(req, res) => {

    const prettyGenres = () => {
        if(req.body.genr) {
            let test = {
                genr: {
                    $in: req.body.genr
                }
            }
            return Object.assign({}, req.body, test)  
        } else {
            return req.body
        }
    }

    const query = prettyGenres()

    try {
        const projection = { 
            _id: 1,
            img: 1,
            name: 1
        }
        const films = await Film.find(query, projection)
         
        res.status(200).json({
            message: 'Search ok',
            films
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router