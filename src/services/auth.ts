import bcrypt from 'bcrypt'
import Joi from 'joi'
import { sign } from 'jsonwebtoken'

import { IUserSignUp, IUserSignIn } from '../interfaces/IUser'
import { userSignUpValidation } from '../utils/validations'
import { secretToken } from '../config/config'

import User from '../models/User'
import Activity from '../models/Activity'
import Library from '../models/Library'

export function Auth () {
    return {
        signup: async (candidate: IUserSignUp) => {
            try {

                const validation = Joi.validate(candidate, userSignUpValidation) 
                if(validation.error) throw new Error('Invalid data')
    
                const isUserExists = await User.findOne({ email: candidate.email })
                if(isUserExists) throw new Error('User exists')
                
                const hash = await bcrypt.hash(candidate.password, 12)
                delete candidate.confirmPassword

                const newUser = new User({
                    ...candidate,
                    password: hash
                })

                await newUser.save()
                await new Activity({ userId: newUser._id }).save()
                await new Library({ userId: newUser._id }).save()

            } catch (err) {
                throw new Error(err)
            }
        },
        signin: async (candidate: IUserSignIn) => {
            try {
                const user = await User.findOne({ email: candidate.email })
                if(!user) return new Error('User not found')

                const passwordCompare = await bcrypt.compare(candidate.password, user.password)
                if(!passwordCompare) return new Error('Wrong password')

                const token = sign({ 
                        userId: user._id
                    }, 
                    secretToken,
                    { 
                        expiresIn: '7d' 
                    }
                )
                return {
                    token,
                    user: {
                        _id: user._id,
                        role: user.role,
                        username: user.username
                    }
                }

            } catch (err) {
                return new Error(err)
            }
        }
    }
}
