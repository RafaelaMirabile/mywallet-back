import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter
.get("/login", (req, res) => {
    res.send("Express on Vercel");
  })
.post('/login',login)
.post('/signup',signUp);

export default authRouter;