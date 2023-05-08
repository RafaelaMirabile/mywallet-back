import { transactionRepository } from "../repositories/transactionRepository.js"

async function userTransactions(userId) {
    const transactions = await transactionRepository.findUserTransactions(userId);
    if (!transactions) {
        throw Error;
    }
    return (transactions);
}

async function registerTransactionOnDB(transaction) {
    const record = await transactionRepository.addTransaction(transaction);
    if(!record){
        throw Error;
    }
}

async function deleteTransactionOnDB(cashflowId){
    const deletedRecord = await transactionRepository.deleteTransaction(cashflowId);
    if(deletedRecord.deletedCount !== 1){
        throw Error;
    }
}

async function updateTransactionOnDB(id,record){
    const updatedRecord = await transactionRepository.updateTransaction(id,record);
    if(updatedRecord.modifiedCount !== 1){
        throw Error;
    }
}

export const transactionService = {
    userTransactions,
    registerTransactionOnDB,
    deleteTransactionOnDB,
    updateTransactionOnDB
}