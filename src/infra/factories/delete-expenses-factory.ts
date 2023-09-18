import { MongoHelper } from '../database/helper-mongodb';

import { ExpenseRepositoryDataBase } from '../../expense/repository/expense-repository-database';
import { DeleteExpense } from '../../expense/application/use-case/delete-expense';
import { DeleteExpensesControllerAdapter } from '../../expense/controller/delete-expenses-controller';

export const makeDeleteExpenseController = (
  database: MongoHelper
): DeleteExpensesControllerAdapter => {
  const repository = new ExpenseRepositoryDataBase(database);
  const useCase = new DeleteExpense(repository);
  return new DeleteExpensesControllerAdapter(useCase);
};
