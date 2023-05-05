import { authService } from "../services/authService.js"

export async function signUp(req, res) {
    const { userName, userEmail, userPassword } = req.body;
    try {
        const userRegistrated = await authService.registerUser(userName, userEmail, userPassword);

        if (userRegistrated) {
            return res.sendStatus(201);
        }

    } catch (error) {
        return res.status(422).send(error.message);
    }

}

export async function login(req, res) {
    const { userPassword, userEmail } = req.body;
    try {
        const session = await authService.findUser(userEmail, userPassword);
        return res.status(200).send(session);

    } catch (error) {
        return res.sendStatus(401);
    }
}

