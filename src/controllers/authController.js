import { signUpInputsValidation } from "../validation/signUpValidation.js";
import { loginInputsValidation } from "../validation/loginValidation.js";
import translate from 'translate'
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid";
import db from '../databasses/mongodb.js'

export async function signUp(req,res) {
    const {userName, userEmail,userPassword} = req.body;
    const passwordHash = bcrypt.hashSync(userPassword,12);
    const signUpInputsValues = {userName, userEmail,userPassword};
    const signUpInputsValidated = signUpInputsValidation(signUpInputsValues);

    if(signUpInputsValidated){
    const errorMessage = signUpInputsValidated.error.details.map(detail => detail.message);
    const errorMessageTranslated = await translate(errorMessage,"pt");
    return res.status(422).send(errorMessageTranslated);
    } 
    
    await db.collection('users').insertOne({
    userName,
    userEmail,
    Userpassword: passwordHash
    }); 
    return res.sendStatus(201);
}

export async function login(req,res){
    const {userPassword,userEmail} = req.body;
    const loginInputsValues = {userPassword,userEmail};

    const loginInputsValidated = loginInputsValidation(loginInputsValues);

    const user = await db.collection('users').findOne({userEmail});

    if(!user){
        return res.sendStatus(401);
    }

    if(loginInputsValidated){
        const errorMessage = loginInputsValidated.error.details.map(detail => detail.message);
        const errorMessageTranslated = await translate(errorMessage,"pt");
        return res.status(422).send(errorMessageTranslated);
    }
    const isValid = bcrypt.compareSync(userPassword, user.Userpassword);
    
    if(isValid){
        const token = uuid();
        await  db.collection('sessions').insertOne({
            token,
            userId : user._id,
            userName : user.userName,
        });

        const session = await db.collection('sessions').findOne({userId : user._id}); 
        return res.status(200).send(session);
    }
    else{
        return res.sendStatus(401);
    }
}