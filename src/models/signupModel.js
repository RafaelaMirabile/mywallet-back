import joi from 'joi'

export const signUpSchema = joi.object({
    userName: joi.string().min(4).max(10).required(),
    userEmail:joi.string().required().email(),
    userPassword: joi.string().required().min(4)
})

