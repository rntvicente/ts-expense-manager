import { ObjectId } from 'mongodb';
import request from 'supertest';
import Chance from 'chance';

import { ExpressAdapter } from '../server/express-adapter';
import { MongoHelper } from '../database/helper-mongodb';
import { UserRoute } from './user-router';
import { BcryptHasher } from '../encrypter/bcrypt-hasher';
import { UserRepositoryDatabase } from '../repository/user-repository-database';
import { UserControllerAdapter } from '../controller/user-controller-adapter';
import { CreateUser } from '../../application/use-cases/create-user';

const COLLECTION_NAME = 'users';

describe('# Route POST Create User Test Integfration', () => {
  const chance = Chance();

  const mongo = new MongoHelper();
  const app = new ExpressAdapter();
  const bcrypterHasher = new BcryptHasher(12);
  const userRepository = new UserRepositoryDatabase(mongo);
  const createUser = new CreateUser(userRepository, bcrypterHasher);
  const userController = new UserControllerAdapter(createUser);
  new UserRoute(app, userController);

  let collection;

  const input = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: 'P4ssw@rd'
  };

  beforeAll(async () => {
    await mongo.connect('mongodb://localhost:27017/ExpensesManager');
    collection = await mongo.getCollection(COLLECTION_NAME);
  });

  beforeEach(async () => {
    await app.listen(3000);
  });

  afterEach(async () => {
    await collection.deleteMany({});
    app.close();
  });

  afterAll(async () => {
    await mongo.close();
  });

  it('should create user', async () => {
    const { body: userId } = await request(app.getApp())
      .post('/users')
      .send(input)
      .expect(201);

    expect(userId).toBeDefined();

    const insertedUser = await collection.findOne({
      _id: new ObjectId(userId)
    });

    expect(insertedUser).toBeDefined();
  });

  it('should return 422 when internal server error', async () => {
    userRepository.save = jest.fn().mockRejectedValue(new Error());
    await request(app.getApp()).post('/users').send(input).expect(422);
  });
});
