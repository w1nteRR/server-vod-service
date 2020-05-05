const { Router } = require('express')
const mongoose = require('mongoose')
const UserPlaylist = require('../../models/UserPlaylist')
const Film = require('../../models/Film')
const Rating = require('../../models/Rating')
const router = Router()

router.put('/liked/add', async(req, res) => {
    const { userId, filmId } = req.body
    
    try {
        const likedList = await UserPlaylist.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                    liked: mongoose.Types.ObjectId(filmId)
                }
            }
        ])

        if(likedList.length) {
            return res.status(404).json({
                message: `${filmId} already liked`
            })
        }

        await UserPlaylist.updateOne(
            { 
                userId: mongoose.Types.ObjectId(userId)
            }, 
            { $push: {'liked': mongoose.Types.ObjectId(filmId) }
        })

        await Rating.updateOne(
            { 
                filmId: mongoose.Types.ObjectId(filmId)
            }, 
            { $push: {'rating.0.likes': mongoose.Types.ObjectId(userId) }
        })

        res.status(200).json({
            message: `${filmId} added to liked`
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.put('/liked/remove', async(req, res) => {
    const { userId, filmId } = req.body
    
    try {
        await UserPlaylist.updateOne(
            { 
                userId: mongoose.Types.ObjectId(userId)
            }, 
            { $pull: {'liked': mongoose.Types.ObjectId(filmId) }
        })

        await Rating.updateOne(
            { 
                filmId: mongoose.Types.ObjectId(filmId)
            }, 
            { $pull: {'rating.0.likes': mongoose.Types.ObjectId(userId) }
        })

        res.status(200).json({
            message: `${filmId} removed`
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/liked/:id', async(req, res) => {
    
    try {
        const likedList = await UserPlaylist.findOne({ userId: mongoose.Types.ObjectId(req.params.id)})
        const likedMaped = likedList.liked.map(film => film)

        const likedListFilms = await Film.find({
            _id: {$in: likedMaped},
        })
          
        const likedListReady = likedListFilms.map(opt => ({
            name: opt.name,
            _id: opt._id,
            img: opt.img
        }))
        
        res.json(likedListReady)

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.put('/dislike/add', async(req, res) => {
    const { userId, filmId } = req.body
    
    try {
        const dislikes = await UserPlaylist.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                    dislikes: mongoose.Types.ObjectId(filmId)
                }
            }
        ])

        if (dislikes.length) {
            return res.status(404).json({
                message: `${filmId} already liked`
            })
        }

        await UserPlaylist.updateOne(
            { 
                userId: mongoose.Types.ObjectId(userId)
            }, 
            { $push: {'dislikes': mongoose.Types.ObjectId(filmId) }
        })

        await Rating.updateOne(
            { 
                filmId: mongoose.Types.ObjectId(filmId)
            }, 
            { $push: {'rating.1.dislikes': mongoose.Types.ObjectId(userId) }
        })

        res.status(200).json({
            message: `${filmId} added to liked`
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.put('/dislike/remove', async(req, res) => {
    const { userId, filmId } = req.body
    
    try {
        await UserPlaylist.updateOne(
            { 
                userId: mongoose.Types.ObjectId(userId)
            }, 
            { $pull: {'dislikes': mongoose.Types.ObjectId(filmId) }
        })

        await Rating.updateOne(
            { 
                filmId: mongoose.Types.ObjectId(filmId)
            }, 
            { $pull: {'rating.1.dislikes': mongoose.Types.ObjectId(userId) }
        })

        res.status(200).json({
            message: `${filmId} removed`
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.post('/like_status', async(req, res) => {

    const { filmId, userId } = req.body

    try {
        const likedList = await UserPlaylist.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                    liked: mongoose.Types.ObjectId(filmId)
                }
            }
        ])

        const dislikedList = await UserPlaylist.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                    dislikes: mongoose.Types.ObjectId(filmId)
                }
            }
        ])

        if(likedList.length) {
            res.status(200).json('like')
        }

        if(dislikedList.length) {
            res.status(200).json('dislike')
        }

        res.status(200).json(null)

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})


module.exports = router