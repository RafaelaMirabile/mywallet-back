import express, { application } from 'express'
import cors from 'cors'
import authRouters from './src/routes/authRouters.js'
import transactionRoutes from './src/routes/transactionRoutes.js'

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouters);
server.use(transactionRoutes);

server.listen(5000,()=> console.log('listening on port 5000'));

