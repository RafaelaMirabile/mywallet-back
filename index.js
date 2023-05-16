import express from 'express'
import cors from 'cors'
import authRouter from './src/routes/authRouters.js'
import transactionsRouter from './src/routes/transactionRoutes.js';

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(transactionsRouter);

server.listen(5000,()=> console.log('listening on port 5000'));

