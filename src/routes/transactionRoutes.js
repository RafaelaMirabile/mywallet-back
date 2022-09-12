import { Router } from "express";
import { home, inflow, outflow } from "../controllers/transitionsController.js";

const router = Router();

router.get('/cashflow', home);
router.post('/inflow', inflow);
router.post('/outflow', outflow);


export default router;