import joi from 'joi'

export const loginSchema = joi.object({
    userEmail:joi.string().required().email(),
    userPassword: joi.string().min(4).required()
})