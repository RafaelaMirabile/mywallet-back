import { ObjectId } from "mongodb";
import db from "../databasses/mongodb.js";
import { transactionService } from "../services/transactionService.js";

export async function getTransactions(req, res) {
    const { user } = res.locals;
    const id = user._id.toString();
    
    try {
        const userTransactions = await transactionService.userTransactions(id);
        const userTransactionsArray = await  userTransactions.toArray();
        return res.status(200).send(userTransactionsArray);
    } catch (error) {
        console.error(error);
        return sendStatus(500);
    }
}

export async function inflow(req, res) {
    const cashInflow = req.body;
    try {

        await db.collection('cashFlow').insertOne(cashInflow);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function outflow(req, res) {
    const cashOutflow = req.body;
    try {
        await db.collection('cashFlow').insertOne(cashOutflow);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteRecord(req, res) {

    const { cashflowId } = req.params;
    const { token } = res.locals;

    try {
        const userTransitions = await db.collection('cashFlow').find({ token: token.toString() });
        if (!userTransitions) {
            return res.status(401).send("ended session");
        }
        await db.collection('cashFlow').deleteOne({ _id: new ObjectId(cashflowId.toString()) });
        return res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("delete record failed");
    }
}

export async function updateRecord(req, res) {
    const { cashflowId } = req.params;
    const { token } = res.locals;

    const transaction = req.body;
    console.log(transaction);

    try {

        const userTransitions = await db.collection('cashFlow').find({ token: token.toString() });
        if (!userTransitions) {
            return res.status(401).send("ended session");
        }
        await db.collection('cashFlow').updateOne({ _id: new ObjectId(cashflowId.toString()) }, {
            $set: {
                description: transaction.description,
                value: transaction.value,
                cashFlowType: transaction.cashFlowType
            }
        })
        const novo = await db.collection('cashFlow').find({ _id: new ObjectId(cashflowId.toString()) }).toArray();
        console.log(novo);
        return res.status(204).send("updated successfully");
    }

    catch (error) {
        console.log(error);
        return res.status(500).send("delete record failed");
    }
}