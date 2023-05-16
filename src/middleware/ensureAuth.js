import { ensureAuthService } from "../services/ensureAuthService.js";

export async function ensureAuth(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send("token undefined");
    }

    try {
        const session = await ensureAuthService.verifySession(token);
        const user = await ensureAuthService.verifyUserById(session.userId);
        delete user.Userpassword;
        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
