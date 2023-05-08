import { Router } from "express";
import { deleteRecord, getTransactions, registerUserTransaction, updateRecord } from "../controllers/transactionsController.js";
import { tokenMiddleware, userMiddleware } from "../middleware/userMiddleware.js";

const transactionsRouter = Router();

transactionsRouter
.get('/cashflow', userMiddleware, getTransactions)
.post('/inflow', tokenMiddleware, registerUserTransaction)
.post('/outflow', tokenMiddleware, registerUserTransaction)
.delete('/cashflow/:cashflowId', tokenMiddleware,deleteRecord)
.put('/cashflow/:cashflowId', tokenMiddleware,updateRecord)

export default transactionsRouter;