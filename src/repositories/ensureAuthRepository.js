import db from "../databasses/mongodb.js"

async function findUserSessionByToken(token){
    const session = await db.collection('sessions').findOne({token});
    return(session);
}

async function findUserByUserId(userId){
   const user = await db.collection('users').findOne({_id : userId});
   return(user);
}

export const ensureAuthRepository = {
    findUserSessionByToken,
    findUserByUserId
}