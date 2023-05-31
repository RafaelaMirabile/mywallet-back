import db from '../databasses/mongodb.js'
import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'

async function findUserByEmail(email) {
    const userFound = await db.collection('users').findOne({ userEmail: email });
    return (userFound)
}

async function registerSession(user) {
    const token = uuid();
    await db.collection('sessions').insertOne({
        token,
        userId: user._id,
        userName: user.userName,
    });

    const userInSessions = await db.collection('sessions').findOne({ userId: user._id });
    return (userInSessions);
}

async function registerUser(name, email, userPassword) {
    const passwordHash = bcrypt.hashSync(userPassword, 12);

    const userRegistratedOnDB = await db.collection('users').insertOne({
        userName : name,
        userEmail: email,
        Userpassword: passwordHash
    });
    return (userRegistratedOnDB);
}

export const authRepository = {
    findUserByEmail,
    registerSession,
    registerUser
}