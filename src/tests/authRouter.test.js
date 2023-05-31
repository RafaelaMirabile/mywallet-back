import { MongoClient } from 'mongodb';
import supertest from 'supertest';
import server from "../../index.js";
import { authFactory } from './factories/authFactory.js';
import { faker } from '@faker-js/faker';

let connection;
let db;
const app = supertest(server);

beforeAll(async () => {
  connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await connection.db(globalThis.__MONGO_DB_NAME__);
});

beforeEach(async () => {
  await db.collection('COLLECTION_NAME').deleteMany({});
});

afterAll(async () => {
  await connection.close();
});

describe('POST/login', () => {
  describe('when body is valid', () => {
    it('should respond with 401 when user not found in db', async () => {
      const body = {
        userPassword: faker.internet.password({ length: 4 }),
        userEmail: faker.internet.email()
      };
      const response = await app.post('/login').send(body);

      expect(response.status).toBe(401);
    })

    it('should respond with 401 when password is incorret', async () => {
      const password = faker.internet.password({ length: 4 });
      const user = await authFactory.createUser(password);

      const body = {
        userPassword: faker.internet.password({ length: 4 }),
        userEmail: user.userEmail
      };

      const response = await app.post('/login').send(body);
      expect(response.status).toBe(401);

    });

    it('should respond with 200 and session when there is an user with given email in db and password is correct', async () => {
      const password = faker.internet.password({ length: 4 });
      const user = await authFactory.createUser(password);

      const body = {
        userPassword: password,
        userEmail: user.userEmail
      };
      const session = await authFactory.createSession(user);

      const response = await app.post('/login').send(body);
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify({
        _id: session._id,
        token: session.token,
        userId: session.userId,
        userName: session.userName
      }))

    });
  });

  describe('when body is not valid', () => {
    it('should respond with 400 when body is not given', async () => {
      const response = await app.post('/login');
      expect(response.status).toBe(400);
    });

    it('should respond with 400 when password is null or undefined', async () => {
      const password = faker.internet.password({ length: 4 });
      const user = await authFactory.createUser(password);

      const body = {
        userPassword: null,
        userEmail: user.userEmail
      };

      const response = await app.post('/login').send(body);
      expect(response.status).toBe(400);
    });

    it('should respond with 400 when email is null or undefined', async () => {

      const body = {
        userPassword: faker.internet.password(),
        userEmail: null
      };
      const response = await app.post('/login').send(body);
      expect(response.status).toBe(400);
    });
  })
});