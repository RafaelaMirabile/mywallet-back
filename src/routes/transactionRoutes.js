import { Router } from "express";
import { home, inflow, outflow } from "../controllers/transitionsController.js";
import { userMiddleware } from "../middleware/userMIddleware.js";

const router = Router();

router.get('/cashflow',userMiddleware,home);
router.post('/inflow',inflow);
router.post('/outflow',outflow);

export default router;