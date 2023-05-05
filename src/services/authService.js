import bcrypt from 'bcrypt'
import { authRepository } from '../repositories/authRepository.js'
import { signUpInputsMiddleware } from '../middleware/signUpMiddleware.js'
import translate from 'translate'

async function findUser(email, userPassword) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error('User not found in db');
    }
    const isValid = bcrypt.compareSync(userPassword, user.Userpassword);
    if (!isValid) {
        throw new Error('Incorrect password');
    }
    const userSession = authRepository.registerSession(user);
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
    return(registratedUser); 
}

export const authService = {
    findUser,
    registerUser
}