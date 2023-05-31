import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import db from "../../databasses/mongodb.js";

async function createUser(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const email = faker.internet.email();
    const name = faker.internet.userName();

    await db.collection('users').insertOne({
        userName: name,
        userEmail: email,
        userPassword: hashedPassword
    });

    const userRegistratedOnDB = await db.collection('users').findOne({ userEmail: email });
    return (userRegistratedOnDB);
}

async function createSession(user) {
    await db.collection('sessions').insertOne({
        token: faker.string.uuid(),
        userId: user._id,
        userName: user.userName,
    });

    const sessionRegistratedOnDB = await db.collection('sessions').findOne({ userId: user._id});
    return (sessionRegistratedOnDB);
}

export const authFactory = {
    createUser,
    createSession
}