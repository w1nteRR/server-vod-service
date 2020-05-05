const { Router } = require('express')
const mongoose = require('mongoose')

const User = require('../models/User')
const router = Router()

router.get('/user/:id', async(req, res) => {
    try {
        const user = await User.aggregate([
            {
                $match: {
                  _id: mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'userplaylists',
                    let: {
                        id: mongoose.Types.ObjectId(req.params.id)
                    },
                    pipeline: [
                        { $match: { $expr: { $eq: [ "$userId",  "$$id" ] }, }},
                        
                    ],
                    as: 'library',
            },
        },
        {
            $unwind: '$library'
        }
    ])

    res.json(user[0])

    } catch(err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router