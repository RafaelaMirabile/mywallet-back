import { signUpSchema } from "../models/signupModel.js";

export function signUpInputsValidation(signUpInputsValues){
    const validation = signUpSchema.validate(signUpInputsValues,{abortEarly:false});

    if(validation.error){
        return validation;
    }
}