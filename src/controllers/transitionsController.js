import db from "../databasses/mongodb.js";

export async function home(req,res){   
    const {user}= res.locals;
    try{
        const userTransitions = await db.collection('cashFlow').find({userId : user._id.toString()}).toArray();        
        return res.status(200).send(userTransitions);
    } catch (error) {
        console.error(error);  
        return sendStatus(500);     
    }
}

export async function inflow(req,res){
    const{token} =res.locals;
    const cashInflow = req.body;
    try{
        const session = await db.collection('sessions').findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
        await db.collection('cashFlow').insertOne(cashInflow);
       return res.sendStatus(200);
    } catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function outflow(req,res){
    const{token} =res.locals;
    const cashOutflow = req.body;
    try{
        const session = await db.collection('sessions').findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
        await db.collection('cashFlow').insertOne(cashOutflow);
       return res.sendStatus(200);
    } catch(error){
        console.log(error);
       return res.sendStatus(500);
    }
}