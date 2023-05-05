import express from 'express'
import cors from 'cors'
import transactionRoutes from './src/routes/transactionRoutes.js'
import authRouter from './src/routes/authRouters.js'

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(transactionRoutes);

server.listen(5000,()=> console.log('listening on port 5000'));

