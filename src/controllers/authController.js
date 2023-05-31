import { authService } from "../services/authService.js"

export async function signUp(req, res) {
    const { userName, userEmail, userPassword } = req.body;

    try {
        const userRegistrated = await authService.registerUser(userName, userEmail, userPassword);
        return res.sendStatus(201);

    } catch (Error) {
        console.log(Error.message);
        if (Error.message === "not able to register user in db") {
            return res.sendStatus(500);
        }
        return res.status(422).send(Error.message);
    }
}

export async function login(req, res) {
    const { userPassword, userEmail } = req.body;

    try {
        const session = await authService.findUser(userEmail, userPassword);
        console.log('sessao dpois do findUser', session);
        return res.status(200).send(session);

    } catch (Error) {
        console.log(Error);
        if (Error.message === "Incorrect password" || Error.message === "User not found in db") {
            return res.status(401).send(Error.message);
        } else if (Error.message === "Bad request") {
            return res.status(400).send(Error.message);
        }
        return res.sendStatus(500);
    }
}

