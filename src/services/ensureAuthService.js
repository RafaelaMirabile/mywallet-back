import { ensureAuthRepository } from "../repositories/ensureAuthRepository.js"

async function verifySession(token){
    const userSession = await  ensureAuthRepository.findUserSessionByToken(token);
    if(!userSession){
        throw new Error("Erro ao tentar obter usuário através da sessão");
    }
    return(userSession);
}

async function verifyUserById(userId){
    const user = await ensureAuthRepository.findUserByUserId(userId);
    if(!user){
        throw new Error("Erro ao tentar obter usuário através do id");
    }
    return(user);
}

export const ensureAuthService = {
    verifySession,
    verifyUserById
}