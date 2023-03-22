import { ObjectId } from 'mongodb';

import { InvalidFieldError } from '../../../shared/errors/invalid-field-error';
import { ExpensesRepository } from '../repository/expenses-repository';

export class UpdateExpenses {
  constructor(private readonly repository: ExpensesRepository) {}

  async execute(expenseId: string): Promise<void> {
    if (!ObjectId.isValid(expenseId)) throw new InvalidFieldError('ExpenseId');

    const filter = { _id: new ObjectId(expenseId) };

    await this.repository.findOneAndUpdate(filter);
  }
}
