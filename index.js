import express from 'express'
import { login, signUp } from './src/controllers/authController.js'
import { home, inflow, outflow } from './src/controllers/transitionsController.js';
import cors from 'cors'



const server = express();
server.use(cors());
server.use(express.json());



/*CADASTRO*/

server.post('/sign-up',signUp);

/*LOGIN*/
server.post('/',login);

/*CASH FLOW*/
server.get('/cashflow', home);

/*INFLOW*/

server.post('/inflow', inflow);

/*OUTFLOW*/
server.post('/outflow', outflow);

server.listen(5000,()=> console.log('listening on port 5000'));

