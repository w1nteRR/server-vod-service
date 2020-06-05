import Joi from 'joi'

export const userSignUpValidation = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required()
})