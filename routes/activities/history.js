const { Router } = require('express')
const mongoose = require('mongoose')

const Activity = require('../../models/Activity')
const router = Router()

router.put('/history/add', async(req, res) => {

    const { film, userId, date, body, activityType } = req.body

    const UTCTime = new Date().toUTCString()

    try {

        const isToday = await Activity.findOne(
            {
                userId: mongoose.Types.ObjectId(userId),
                'history.date': new Date().toDateString()
            }
        )

       if(isToday) {
            return await Activity.updateOne(
                { 
                    userId: mongoose.Types.ObjectId(userId),
                    'history.date': new Date().toDateString()
                }, 
                { $push: {
                    'history.$.data': {                        
                            film,
                            body,
                            activityType,
                            time: UTCTime
                    }
                }
            })
       }

       await Activity.updateOne(
        { 
            userId: mongoose.Types.ObjectId(userId)
        }, 
        { $push: {
            'history': {
                date,
                data: [
                    {
                        film,
                        body,
                        activityType,
                        time: UTCTime
                    }
                ]
            }
        }
    })

    res.status(200).json({
        message: ''
    })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/history/:id', async(req, res) => {


    const query = {
        userId: mongoose.Types.ObjectId(req.params.id)
    }

    const projection = {
        history: 1
    }

    try {
        const history = await Activity.findOne(query, projection)
        history.history.reverse()
        
        res.status(200).json({
            message: 'history has been loadaed',
            history
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})


module.exports = router