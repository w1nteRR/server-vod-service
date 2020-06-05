const { Router } = require('express')

const User = require('../models/User')
const Playlist = require('../models/Playlist')
const router = Router()

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        
        if(!users) {
            return res.status(400).json({ message: 'Users not founded' })
        }

        res.json({ users })

        res.status(200).json({
            message: 'Users loaded'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/users/s', async(req, res) => {
    try {
        const trends = await Playlist.aggregate([
            {
                $match: {
                    name: 'Trends'
                }
            },
            {
                $lookup: {
                    from: 'films',       
                    localField: 'films',   
                    foreignField: '_id', 
                    as: 'trends'         
                }   
            }
        ])

        const data = trends[0].trends.map(options => ({
            name: options.name,
            _id: options._id,
            describe: options.describe,
            img: options.img,
            wallpaper: options.wallpaper
        }))

        const shuffle = (array) => {
            for (let index = array.length - 1; index > 0; index--) {
                let randomize = Math.floor(Math.random() * (index + 1))
                let temp = array[index]
                array[index] = array[randomize]
                array[randomize] = temp
            }
        }

        shuffle(data)
        
        res.json(data)

        res.status(200).json({
            message: 'Users loaded'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router