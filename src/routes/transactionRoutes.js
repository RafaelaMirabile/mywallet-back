import { Router } from "express";
import { deleteRecord, home, inflow, outflow, updateRecord } from "../controllers/transitionsController.js";
import { tokenMiddleware, userMiddleware } from "../middleware/userMIddleware.js";

const router = Router();

router.get('/cashflow', userMiddleware, home);
router.delete('/cashflow/:cashflowId', tokenMiddleware,deleteRecord);
router.put('/cashflow/:cashflowId', tokenMiddleware,updateRecord);
router.post('/inflow', tokenMiddleware, inflow);
router.post('/outflow', tokenMiddleware, outflow);

export default router;