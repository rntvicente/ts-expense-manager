import { MongoHelper } from '../database/helper-mongodb';

import { ExpenseRepositoryDataBase } from '../../expense/repository/expense-repository';
import { CreateExpenses } from '../../expense/application/use-case/create-expense';
import { CreateExpensesControllerAdapter } from '../../expense/controller/create-expenses-controller';

export const makeCreateExpenseController = (
  database: MongoHelper
): CreateExpensesControllerAdapter => {
  const repository = new ExpenseRepositoryDataBase(database);
  const useCase = new CreateExpenses(repository);
  return new CreateExpensesControllerAdapter(useCase);
};
