import { ObjectId } from 'mongodb';
import request from 'supertest';
import Chance from 'chance';

import { ExpressAdapter } from '../../infra/server/express-adapter';
import { MongoHelper } from '../../infra/database/helper-mongodb';
import { UserRoute } from './signup-router';
import { UserRepositoryDatabase } from '../repository/user-repository-database';
import { SignInControllerAdapter } from '../controller/signin-controller-adapter';
import { SignIn } from '../application/use-cases/signup';

const COLLECTION_NAME = 'users';

describe('# Route POST Sign In Test Integration', () => {
  const chance = Chance();

  const mongo = new MongoHelper();
  const app = new ExpressAdapter();
  const userRepository = new UserRepositoryDatabase(mongo);
  const signIn = new SignIn(userRepository);
  const signInController = new SignInControllerAdapter(signIn);
  new UserRoute(app, signInController);

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
      .post('/signup')
      .send(input)
      .expect(201);

    expect(userId).toBeDefined();

    const insertedUser = await collection.findOne({
      _id: new ObjectId(userId)
    });

    expect(insertedUser.email).toStrictEqual(input.email);
  });

  it('should return 422 when internal server error', async () => {
    userRepository.save = jest.fn().mockRejectedValue(new Error());
    await request(app.getApp()).post('/signup').send(input).expect(422);
  });
});
