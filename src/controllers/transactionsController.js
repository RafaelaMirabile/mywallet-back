import { transactionService } from "../services/transactionService.js";

export async function getTransactions(req, res) {
    const { user } = res.locals;
    const id = user._id.toString();

    try {
        const userTransactions = await transactionService.userTransactions(id);
        const userTransactionsArray = await userTransactions.toArray();
        return res.status(200).send(userTransactionsArray);
    } catch (error) {
        console.error(error);
        return sendStatus(500);
    }
}

export async function registerUserTransaction(req, res) {
    const transaction = req.body;

    try {
        await transactionService.registerTransactionOnDB(transaction);
        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteRecord(req, res) {
    const { cashflowId } = req.params;
    const id = cashflowId.toString();

    try {
        await transactionService.deleteTransactionOnDB(id);
        return res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("delete record failed");
    }
}

export async function updateRecord(req, res) {
    const { cashflowId } = req.params;
    const record = req.body;
    const id = cashflowId.toString();

    try {
        await transactionService.updateTransactionOnDB(id,record);
        return res.status(204).send("updated successfully");
    }

    catch (error) {
        console.log(error);
        return res.status().send("delete record failed");
    }
}