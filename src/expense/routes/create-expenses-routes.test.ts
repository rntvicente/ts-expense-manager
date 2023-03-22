import { Chance } from 'chance';
import request from 'supertest';

import { MongoHelper } from '../../infra/database/helper-mongodb';
import { ExpressAdapter } from '../../infra/server/express-adapter';
import { CreateExpenseRoute } from './create-expenses-routes';

import { CreateExpenses } from '../application/use-case/create-expense';
import { CreateExpensesControllerAdapter } from '../controller/create-expenses-controller';
import { ExpenseRepositoryDataBase } from '../repository/expense-repository';
import { ObjectId } from 'mongodb';

describe('# Route POST Create Expenses Test Integration', () => {
  const mongo = new MongoHelper();
  const app = new ExpressAdapter();
  const chance = Chance();

  const repository = new ExpenseRepositoryDataBase(mongo);
  const useCase = new CreateExpenses(repository);
  const controller = new CreateExpensesControllerAdapter(useCase);
  new CreateExpenseRoute(app, controller);

  let collection;
  const COLLECTION_NAME = 'expenses';

  const input = {
    userId: new ObjectId().toString(),
    categoryId: new ObjectId().toString(),
    description: chance.word({ length: 25 }),
    value: 100.1,
    purchaseDate: chance.date()
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

  it('should create an Expense', async () => {
    const { body: expenseId } = await request(app.getApp())
      .post('/expenses')
      .send(input)
      .expect(201);

    expect(expenseId).toBeDefined();

    const expense = await collection.findOne({ _id: new ObjectId(expenseId) });

    expect(expense).toBeDefined();
  });

  it('should return 422 when internal server error', async () => {
    repository.save = jest
      .fn()
      .mockRejectedValueOnce(new Error('Internal Server Error'));

    await request(app.getApp()).post('/expenses').send(input).expect(422);
  });
});
