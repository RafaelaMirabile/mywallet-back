import { loginSchema } from "../models/loginModel.js";

export function loginInputsValidation(loginInputsValues){
    const validation = loginSchema.validate(loginInputsValues, {abortEarly:false});

    if(validation.error){
        return validation;
    }
}