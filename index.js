import express, { application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { MongoClient } from 'mongodb'
import {signUpInputsValidation} from './src/validation/signUpValidation.js'
import { loginInputsValidation } from './src/validation/loginValidation.js'
import translate  from "translate";


dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

let db;
const mongoClient = new MongoClient (process.env.MONGO_URI);
mongoClient.connect().then(()=>{
    db = mongoClient.db('mywallet');
});

/*CADASTRO*/

server.post('/sign-up',async (req,res)=>{
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
});

/*LOGIN*/
server.post('/', async(req,res)=>{
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
})

/*CASH FLOW*/
server.get('/cashflow', async (req,res)=>{
    const token = req.headers.authorization?.replace('Bearer ','');
    
    try {
        const session = await db.collection('sessions').findOne({token});
        console.log(session);
        if(!session){
            return res.sendStatus(401);
        }
        const user = await db.collection('users').findOne({_id : session.userId});
        delete user.Userpassword;

        const userTransitions = await db.collection('cashFlow').find({userId : user._id.toString()}).toArray();        
        return res.send(userTransitions);
    } catch (error) {
        console.error(error);       
    }
});

/*INFLOW*/

server.post('/inflow', async(req,res)=>{
    const token = req.headers.authorization?.replace('Bearer ', '');   
    const cashInflow = req.body;
    try{
        const session = await db.collection('sessions').findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
        await db.collection('cashFlow').insertOne(cashInflow);
    } catch(error){
        console.log(error)
    }
});

/*OUTFLOW*/
server.post('/outflow', async(req,res)=>{
    const token = req.headers.authorization?.replace('Bearer ', '');
    const cashOutflow = req.body;
    try{
        const session = await db.collection('sessions').findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
        await db.collection('cashFlow').insertOne(cashOutflow);
    } catch(error){
        console.log(error)
    }
});


server.listen(5000,()=> console.log('listening on port 5000'));

