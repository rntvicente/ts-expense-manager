import { Expense } from '../../domains/expenses/expense-entity';

export interface ExpensesRepository {
  save(expense: Expense): Promise<string>;
}
