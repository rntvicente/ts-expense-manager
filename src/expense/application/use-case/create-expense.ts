import { Expense } from '../../domains/expenses/expense-entity';
import { ExpensesRepository } from '../repository/expenses-repository';

export class CreateExpenses {
  constructor(private readonly repository: ExpensesRepository) {}

  async execute({
    userId,
    categoryId,
    description,
    value,
    createAt = new Date()
  }: Input): Promise<string> {
    const expense = Expense.create(
      userId,
      categoryId,
      description,
      value,
      createAt
    );

    return await this.repository.save(expense);
  }
}

type Input = {
  userId: string;
  description: string;
  value: number;
  categoryId: string;
  createAt?: Date;
};
