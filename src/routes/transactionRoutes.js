import { Router } from "express";
import { deleteRecord, getTransactions, inflow, outflow, updateRecord } from "../controllers/transactionsController.js";
import { tokenMiddleware, userMiddleware } from "../middleware/userMiddleware.js";

const transactionsRouter = Router();

transactionsRouter
.get('/cashflow', userMiddleware, getTransactions)
.delete('/cashflow/:cashflowId', tokenMiddleware,deleteRecord)
.put('/cashflow/:cashflowId', tokenMiddleware,updateRecord)
.post('/inflow', tokenMiddleware, inflow)
.post('/outflow', tokenMiddleware, outflow)

export default transactionsRouter;