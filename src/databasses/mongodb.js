import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config();
let db = null;
console.log(process.env.MONGO_ATLAS_URI);
const mongoClient = new MongoClient (process.env.MONGO_ATLAS_URI);
try{
    await mongoClient.connect();
    db = mongoClient.db('mywallet');

}catch(error){
    console.error(error);
}

export default db;