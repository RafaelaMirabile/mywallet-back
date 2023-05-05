import { transactionRepository } from "../repositories/transactionRepository.js"

async function userTransactions(userId) {
    const transactions = await transactionRepository.findUserTransactions(userId);
    return (transactions);
}

export const transactionService = {
    userTransactions
}