import { ObjectId } from 'mongodb';

import { Expense } from '../../domains/expenses/expense-entity';
import { ExpenseModel } from '../../repository/expense-model';

export type ExpenseFilter = {
  _id?: ObjectId;
  userId?: ObjectId;
  categoryId?: ObjectId;
  description?: string;
  value?: number;
  createAt?: Date;
};

export type ExpenseUpdate = {
  categoryId?: ObjectId;
  description?: string;
  value?: number;
  purchaseDate?: Date;
};

export interface ExpensesRepository {
  save(expense: Expense): Promise<string>;
  findOne(filter: ExpenseFilter): Promise<ExpenseModel | null>;
  findOneAndUpdate(filter: ExpenseFilter, model: ExpenseModel): Promise<void>;
  findAndDelete(id: ObjectId): Promise<void>;
}
