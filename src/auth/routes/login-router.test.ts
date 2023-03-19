import request from 'supertest';
import Chance from 'chance';
import { decode } from 'jsonwebtoken';

import { ExpressAdapter } from '../../infra/server/express-adapter';
import { MongoHelper } from '../../infra/database/helper-mongodb';

import { UserRepositoryDatabase } from '../repository/user-repository-database';
import { LoginInControllerAdapter } from '../controller/login-controller-adapter';
import { User } from '../domains/users/user-entity';
import { Login } from '../application/use-cases/login';

import { LoginRoute } from './login-router';

const COLLECTION_NAME = 'users';

describe('# Route POST Login Test Integration', () => {
  const chance = Chance();

  const mongo = new MongoHelper();
  const app = new ExpressAdapter();
  const userRepository = new UserRepositoryDatabase(mongo);
  const login = new Login(userRepository);
  const loginController = new LoginInControllerAdapter(login);
  new LoginRoute(app, loginController);

  let collection;

  const input = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: 'P4ssw@rd'
  };

  beforeAll(async () => {
    await mongo.connect(process.env.MONGO_URL);
    collection = await mongo.getCollection(COLLECTION_NAME);
  });

  beforeEach(async () => {
    const user = await User.create(
      input.firstName,
      input.lastName,
      input.email,
      input.password
    );

    await userRepository.save(user);
    await app.listen(3000);
  });

  afterEach(async () => {
    await collection.deleteMany({});
    app.close();
  });

  afterAll(async () => {
    await mongo.close();
  });

  it('should login', async () => {
    const {
      body: { token }
    } = await request(app.getApp()).post('/login').send(input).expect(200);

    expect(token).toBeDefined();
  });

  it('should return 422 when invalid login', async () => {
    const { body } = await request(app.getApp())
      .post('/login')
      .send({ email: input.email, password: 'invalid_password' })
      .expect(422);

    expect(body).toEqual({ message: 'E-mail or Password invalid.' });
  });
});
