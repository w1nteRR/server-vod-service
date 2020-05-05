const { Router } = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const UserPlaylist = require('../models/UserPlaylist')
const Activity = require('../models/Activity')

const router = Router()

const userValidate = Joi.object().keys({
	email: Joi.string().email().required(),
	username: Joi.string().required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
})

router.post('/registration', async(req, res) => {

    console.log(req.body)
    try {
        const validateResult = Joi.validate(req.body, userValidate)
        if (validateResult.error) {
            return res.status(404).json({
                message: 'Wrong data'
            })
        }

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404).json({
                message: 'Email already use'
            })
        }

        const hash = await bcrypt.hash(validateResult.value.password, 12)
        const newUser = new User({ 
            email: validateResult.value.email, 
            password: hash, 
            username: validateResult.value.username 
        })

        await newUser.save()        
        await new Activity({ userId: newUser._id }).save()
        await new UserPlaylist({ userId: newUser._id }).save()

        res.status(201).json({
            message: 'User has been created'
        })

    } catch(err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.post('/login', async(req, res) => {

    const { password, username } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        const passwordCompare = bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({ message: 'Wrong password' })
        }
      
        const token = jwt.sign(
            { 
                userId: user.id,
            },
            config.get('jwtSecret'),
            { 
                expiresIn: '7d' 
            }
        )
      
        //   res.json({ token, userId: user.id, userRole: user.role })
        //   res.cookie('token', '12345ABCDE', {
        //     maxAge: 3600 * 24,
        //   })
          res.cookie('w_auth', 's',  { maxAge: 99909 })
          .status(200)
          .json({ 
                token, 
                userId: user.id, 
                userRole: user.role,
                username: user.username 
            })

          res.send()

          res.status(200).json({
              message: 'good login'
          })

    } catch(err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router