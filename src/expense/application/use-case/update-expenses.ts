import { ObjectId } from 'mongodb';

import { Expense } from '../../domains/expenses/expense-entity';
import { InvalidFieldError } from '../../../shared/errors/invalid-field-error';
import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';

import { ExpenseMapper } from '../../../infra/mappers/expense-mapper';

import {
  ExpensesRepository,
  ExpenseUpdate
} from '../repository/expenses-repository';

export class UpdateExpenses {
  constructor(private readonly repository: ExpensesRepository) {}

  async execute({ expenseId, document }: Input): Promise<void> {
    if (!ObjectId.isValid(expenseId)) throw new InvalidFieldError('ExpenseId');

    const filter = { _id: new ObjectId(expenseId) };
    
    const expenseModel = await this.repository.findOne(filter);

    if (!expenseModel) throw new Error(`Expense not found to id ${expenseId}.`);

    const id = new UniqueEntityIdVO(expenseModel._id);
    const userId = new UniqueEntityIdVO(expenseModel.userId);
    const categoryId = new UniqueEntityIdVO(document.categoryId || expenseModel.categoryId);
    const description = document.description || expenseModel.description;
    const value = document.value || expenseModel.value;
    const purchaseDate = document.purchaseDate || expenseModel.purchaseDate;

    const changedExpense = new Expense(
      id,
      userId,
      categoryId,
      description,
      value,
      purchaseDate,
      expenseModel.createAt,
      new Date()
    );

    await this.repository.findOneAndUpdate(
      filter,
      ExpenseMapper.toModel(changedExpense)
    );
  }
}

type Input = {
  expenseId: string;
  document: ExpenseUpdate;
};
