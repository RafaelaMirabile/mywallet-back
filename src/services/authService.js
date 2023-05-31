import { authRepository } from '../repositories/authRepository.js'
import { signUpInputsMiddleware } from '../middleware/signUpMiddleware.js'
import translate from 'translate'
import bcrypt from 'bcrypt'

async function findUser(email, userPassword) {
    if (email == null || userPassword == null || email == null && userPassword == null) {
        throw new Error('Bad request');
    }
    
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw new Error('User not found in db');
    }

    const isValid = await bcrypt.compareSync(userPassword, user.userPassword);
    if (!isValid) {
        throw new Error('Incorrect password');
    }
    
    const userSession = await authRepository.registerSession(user);
    return (userSession);
}

async function registerUser(userName, userEmail, userPassword) {
    const signUpInputsValues = { userName, userEmail, userPassword };
    const signUpInputsValidated = signUpInputsMiddleware(signUpInputsValues);

    if (signUpInputsValidated) {
        const errorMessage = signUpInputsValidated.error.details.map(detail => detail.message);
        const errorMessageTranslated = await translate(errorMessage, "pt");
        throw new Error(`${errorMessageTranslated}`);
    }

    const registratedUser = await authRepository.registerUser(userName, userEmail, userPassword);
    if (!registratedUser) {
        throw new Error("not able to register user in db");
    }
    return (registratedUser);
}

export const authService = {
    findUser,
    registerUser
}