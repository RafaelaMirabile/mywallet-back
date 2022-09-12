import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";

const router = Router();

router.post('/',login);
router.post('/sign-up',signUp);

export default router;