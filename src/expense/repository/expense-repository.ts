import { DatabaseHelper } from '../../infra/database/helper';
import { ExpenseMapper } from '../../infra/mappers/expense-mapper'

import { Expense } from '../domains/expenses/expense-entity';
import { ExpensesRepository } from '../application/repositories/expenses-repository';

const COLLECTION_NAME = 'expenses';

export class ExpenseRepositoryDataBase implements ExpensesRepository {
  constructor(private readonly database: DatabaseHelper) {}

  async save(expense: Expense): Promise<string> {
    const model = await ExpenseMapper.toModel(expense);

    const collection = await this.database.getCollection(COLLECTION_NAME);
    const { insertedId } = await collection.insertOne(model);

    return insertedId.toString();
  }
}
