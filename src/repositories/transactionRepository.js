import db from "../databasses/mongodb.js";

async function findUserTransactions(id) {
    const userTransactions = await db.collection('cashFlow').find({ userId: id });
    return (userTransactions);
}

export const transactionRepository = {
    findUserTransactions
}