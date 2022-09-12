import { Router } from "express";
import { home, inflow, outflow } from "../controllers/transitionsController.js";
import { tokenMiddleware, userMiddleware } from "../middleware/userMIddleware.js";

const router = Router();

router.get('/cashflow',userMiddleware,home);
router.post('/inflow',tokenMiddleware,inflow);
router.post('/outflow',tokenMiddleware,outflow);

export default router;