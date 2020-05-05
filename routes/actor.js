const { Router } = require('express')
const mongoose = require('mongoose')

const Actor = require('../models/Actor')
const router = Router()

router.post('/actor/create', async (req, res) => {
    const { actorName, actorRole, filmId } = req.body
    
    const actor = {
        actorName,
        films: [
            {
                actorRole,
                _id: mongoose.Types.ObjectId(filmId),
                img: '/static/' + filmId  + '/' + actorName.replace(/ /g, '_') + '.jpg',
            }
        ]
    }

    try {

        const isActor = await Actor.findOne({ actorName })
        if(isActor) {
            return res.status(400).json({
                message: 'Actor already exists'
            })
        }

        const newActor = new Actor(actor)
  
        await newActor.save()

        res.status(201).json({
            message: 'Actor has been created'
        })

    } catch(err) {
        res.status(400).json({
            message: 'Somethig went wrong'
        })
    }
})

router.get('/actor/:id', async(req, res) => {
    try {

        const actor = await Actor.findOne({ _id: req.params.id })

        if(!actor) {
            return res.status(400).json({ message: 'Actor not founded' })
        }

        res.json({ actor })

        res.status(200).json({
            message: 'Cast loaded'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.post('/actor/:id/role', async(req, res) => {
    const { actorName, actorRole, filmId } = req.body
    
    const role = {
        actorRole,
        _id: mongoose.Types.ObjectId(filmId),
        img: '/static/' + filmId  + '/' + actorName.replace(/ /g, '_') + '.jpg',
    }
    
    try {
        const isRole = await Actor.findOne({
            _id: req.params.id,
            'films._id': mongoose.Types.ObjectId(filmId)
        })

        if(isRole) {
            return res.status(400).json({
                message: 'Role already exists'
            })
        }

        await Actor.updateOne(
            { 
                _id: req.params.id 
            }, 
            { $push: {'films': role }
        })

        res.status(200).json({
            message: 'Role has been created'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.put('/actor/role/remove', async(req, res) => {
    const { actorId, filmId } = req.body
        
    try {

        await Actor.updateOne(
            { 
                _id: mongoose.Types.ObjectId(actorId),
                'films._id': mongoose.Types.ObjectId(filmId)

            }, 
            { $pull: {'films': {
                _id: mongoose.Types.ObjectId(filmId)
            } }
        })

        res.status(200).json({
            message: 'Role has been deleted'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/actors', async(req, res) => {

    try {

        const actors = await Actor.find({})

        if(!actors) {
            return res.status(400).json({ message: 'Actors not founded' })
        }

        res.json(actors.reverse())

        res.status(200).json({
            message: 'Cast loaded'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router