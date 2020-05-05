const { Router } = require('express')
const mongoose = require('mongoose')

const Rating = require('../models/Rating')

const router = Router()

router.get('/rating', async(req, res) => {
    const { filmId, mark } = req.body

    console.log(req.body)
    try {

        // await Film.updateOne({

        // })

        res.status(201).json({
            message: 'Ok'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/film/:id/rating', async(req, res) => {
    
    const query = {
        filmId: req.params.id
    }

    const projection = {
        rating: 1
    }

    try {

        const film = await Rating.findOne(query, projection)

        res.status(200).json({
            message: 'Ok',
            film
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router
