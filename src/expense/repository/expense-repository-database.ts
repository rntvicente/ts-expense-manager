import { DatabaseHelper } from '../../infra/database/database-helper';
import { ExpenseMapper } from '../../infra/mappers/expense-mapper';

import { Expense } from '../domains/expenses/expense-entity';
import { ExpenseModel } from './expense-model';
import {
  ExpenseFilter,
  ExpensesRepository
} from '../application/repository/expenses-repository';

const COLLECTION_NAME = 'expenses';

export class ExpenseRepositoryDataBase implements ExpensesRepository {
  constructor(private readonly database: DatabaseHelper) {}

  async findOne(filter: ExpenseFilter): Promise<ExpenseModel | null> {
    const collection = await this.database.getCollection(COLLECTION_NAME);
    return collection.findOne<ExpenseModel | null>(filter);
  }

  async findOneAndUpdate(
    filter: ExpenseFilter,
    model: ExpenseModel
  ): Promise<void> {
    const collection = await this.database.getCollection(COLLECTION_NAME);
    await collection.findOneAndUpdate(filter, { $set: model });
  }

  async save(expense: Expense): Promise<string> {
    const model = await ExpenseMapper.toModel(expense);

    const collection = await this.database.getCollection(COLLECTION_NAME);
    const { insertedId } = await collection.insertOne(model);

    return insertedId.toString();
  }
}
