import joi from 'joi'

export const signUpSchema = joi.object({
    userName: joi.string().min(4).max(10).required(),
    userEmail:joi.string().email().required(),
    userPassword: joi.string().min(4).required()
})

