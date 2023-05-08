import { Router } from "express";
import { deleteRecord, getTransactions, registerUserTransaction, updateRecord } from "../controllers/transactionsController.js"
import { ensureAuth } from "../middleware/ensureAuth.js"

const transactionsRouter = Router();

transactionsRouter
    .get('/cashflow', ensureAuth, getTransactions)
    .post('/inflow', ensureAuth, registerUserTransaction)
    .post('/outflow', ensureAuth, registerUserTransaction)
    .delete('/cashflow/:cashflowId', ensureAuth, deleteRecord)
    .put('/cashflow/:cashflowId', ensureAuth, updateRecord)

export default transactionsRouter;