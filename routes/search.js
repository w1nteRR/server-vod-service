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
            data: films
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/search/actors/:text', async(req, res) => {

    console.log(req.params.text.length)

    try {
        let pattern = `${req.params.text}`;
        let regex = new RegExp(`${pattern}`, 'i')
        console.log(regex)

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

    const pretty = obj => {
        for( let key in obj ) {
            if(obj[key].length === 0) {
                delete obj[key]
            }
        }
        return obj
    }
    const query = pretty(req.body)
    
    if(!Object.keys(query).length) {
        return res.status(404).json({
            message: 'Choose tags'
        })
    }

    const mergeGenr = () => {
        if(query.genr) {
            let test = {
                genr: {
                    $in: query.genr
                }
            }
            return Object.assign({}, query, test)  
        } else {
            return query
        }
    }

    const ready = mergeGenr()

    try {
        const projection = { 
            _id: 1,
            img: 1
        }
        const films = await Film.find(ready, projection)
 
        res.json(films)
        
        res.status(200).json({
            message: 'Search ok'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router