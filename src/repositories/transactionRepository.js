import { ObjectId } from "mongodb";
import db from "../databasses/mongodb.js";

async function findUserTransactions(id) {
    const userTransactions = await db.collection('cashFlow').find({ userId: id });
    return (userTransactions);
}

async function addTransaction(transaction) {
    const newTransaction = await db.collection('cashFlow').insertOne(transaction);
    return (newTransaction);
}

async function deleteTransaction(cashflowId) {
    const deleted = await db.collection('cashFlow').deleteOne({ _id: new ObjectId(cashflowId) });
    return (deleted);
}

async function updateTransaction(id, record) {
    const updated = await db.collection('cashFlow').updateOne({ _id: new ObjectId(id) }, {
        $set: {
            description: record.description,
            value: record.value,
            cashFlowType: record.cashFlowType
        }
    });
    return(updated);
}

export const transactionRepository = {
    findUserTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction
}