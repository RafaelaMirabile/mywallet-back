import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config();
let db;
const mongoClient = new MongoClient (process.env.MONGO_URI);
mongoClient.connect().then(()=>{
    db = mongoClient.db('mywallet');
});

export async function home(req,res){
    
    const token = req.headers.authorization?.replace('Bearer ','');    
    try {
        const session = await db.collection('sessions').findOne({token});
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
}

export async function inflow(req,res){
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
}

export async function outflow(req,res){
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
}