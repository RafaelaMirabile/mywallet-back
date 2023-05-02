import { ObjectId } from "mongodb";
import db from "../databasses/mongodb.js";

export async function home(req, res) {
    const { user } = res.locals;
    try {
        const userTransitions = await db.collection('cashFlow').find({ userId: user._id.toString() }).toArray();
        return res.status(200).send(userTransitions);
    } catch (error) {
        console.error(error);
        return sendStatus(500);
    }
}

export async function inflow(req, res) {
    const { token } = res.locals;
    const cashInflow = req.body;
    try {
        const session = await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        await db.collection('cashFlow').insertOne(cashInflow);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function outflow(req, res) {
    const { token } = res.locals;
    const cashOutflow = req.body;
    try {
        const session = await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
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