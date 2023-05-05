import { signUpSchema } from "../schmas/signupSchema.js";

export function signUpInputsMiddleware(signUpInputsValues){
    const validation = signUpSchema.validate(signUpInputsValues,{abortEarly:false});

    if(validation.error){
        return validation;
    }
}