import { signUpInputsValidation } from "../validation/signUpValidation.js";
import { loginInputsValidation } from "../validation/loginValidation.js";
import translate from 'translate'
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config();
let db;
const mongoClient = new MongoClient (process.env.MONGO_URI);
mongoClient.connect().then(()=>{
    db = mongoClient.db('mywallet');
});

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
        return res.status(409).send("User don't exists!");
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
        return res.send(session);
    }
    else{
        return res.sendStatus(401);
    }
}