const { Router } = require('express')
const mongoose = require('mongoose')

const UserPlaylist = require('../../models/UserPlaylist')
const Film = require('../../models/Film')

const router = Router()

router.put('/watch_later/add', async(req, res) => {
    const { userId, filmId } = req.body

    try {
        const watchLaterList = await UserPlaylist.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                    watchLater: mongoose.Types.ObjectId(filmId)
                }
            }
        ])

        if(watchLaterList.length) {
            return res.status(404).json({
                message: `Film in list already`
            })
        }

        await UserPlaylist.updateOne(
            { 
                userId: mongoose.Types.ObjectId(userId)
            }, 
            { $push: {
                'watchLater': mongoose.Types.ObjectId(filmId)
            }
        })

        res.status(200).json({
            message: `Film has been added`
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/later/:id', async(req, res) => {
    
    try {
        const likedList = await UserPlaylist.findOne({ 
            userId: mongoose.Types.ObjectId(req.params.id)}, 
            {
                watchLater: 1
            })
        
        const films = await Film.find({
            _id: {
                $in: likedList.watchLater
            }
        }, 
        {
            name: 1,
            _id: 1,
            img: 1
        })

     
        res.status(200).json(films)

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router