import { ObjectId } from 'mongodb';
import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';

import { ExpensesRepository } from '../repository/expenses-repository';

export class DeleteExpense {
  constructor(private readonly repository: ExpensesRepository) {}

  async execute(expenseId: string): Promise<void> {
    const uniqueEntityId = new UniqueEntityIdVO(expenseId);

    await this.repository.findAndDelete(uniqueEntityId.value as ObjectId);
  }
}
