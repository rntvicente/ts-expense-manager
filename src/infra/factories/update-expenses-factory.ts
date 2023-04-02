import { MongoHelper } from '../database/helper-mongodb';

import { ExpenseRepositoryDataBase } from '../../expense/repository/expense-repository-database';
import { UpdateExpenses } from '../../expense/application/use-case/update-expenses';
import { UpdateExpensesControllerAdapter } from '../../expense/controller/update-expenses-controller';

export const makeUpdateExpenseController = (
  database: MongoHelper
): UpdateExpensesControllerAdapter => {
  const repository = new ExpenseRepositoryDataBase(database);
  const useCase = new UpdateExpenses(repository);
  return new UpdateExpensesControllerAdapter(useCase);
};
