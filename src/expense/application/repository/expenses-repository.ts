import { ObjectId } from 'mongodb';

import { Expense } from '../../domains/expenses/expense-entity';

export type ExpenseFilter = {
  _id?: ObjectId;
  userId?: ObjectId;
  categoryId?: ObjectId;
  description?: string;
  value?: number;
  createAt?: Date;
}

export interface ExpensesRepository {
  save(expense: Expense): Promise<string>;
  findOneAndUpdate(filter: ExpenseFilter, expense: Expense): Promise<void>;
}
