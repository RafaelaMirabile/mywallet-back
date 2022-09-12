import express, { application } from 'express'
import { home, inflow, outflow } from './src/controllers/transitionsController.js';
import cors from 'cors'
import authRouters from './src/routes/authRouters.js'
import transactionRoutes from './src/routes/transactionRoutes.js'

const server = express();
server.use(cors());
server.use(express.json());

/*CADASTRO*/
/*LOGIN*/
server.use(authRouters);
/*CASH FLOW*/
/*INFLOW*/
/*OUTFLOW*/
server.use(transactionRoutes);

server.listen(5000,()=> console.log('listening on port 5000'));

