import db from "../databasses/mongodb.js";

export async function userMiddleware(req,res,next){

    const token = req.headers.authorization?.replace('Bearer ','');

    if(!token){
        return res.sendStatus(401);
    }
    res.locals.token =token;
    
    try{
        const session = await db.collection('sessions').findOne({token});
        if(!session){
            return res.sendStatus(401);
        }
        const user = await db.collection('users').findOne({_id : session.userId});
        delete user.Userpassword; 
        res.locals.user = user;
        next();
    }catch (error) {
        console.log('Erro ao tentar obter usuário através da sessão');
        console.log(error);
        return res.sendStatus(500);
      }
}

export function tokenMiddleware(req,res,next){
    const token = req.headers.authorization?.replace('Bearer ','');

    if(!token){
        return res.sendStatus(401);
    }
    res.locals.token =token;
    next();
}