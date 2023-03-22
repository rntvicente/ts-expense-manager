import { ObjectId } from 'mongodb';
import Chance from 'chance';

import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';

import { Expense } from '../../domains/expenses/expense-entity';
import { ExpensesRepository } from '../repository/expenses-repository';

import { CreateExpenses } from './create-expense';

const chance = Chance();

const makeRepository = (input, mongoId) => {
  class ExpensesRepositoryStub implements ExpensesRepository {
    async save(expense: Expense): Promise<string> {
      expect(expense.categoryId).toBeInstanceOf(UniqueEntityIdVO);
      expect(expense.userId).toBeInstanceOf(UniqueEntityIdVO);
      expect(expense.description).toStrictEqual(input.description);
      expect(expense.value).toBeDefined();
      expect(expense.createAt).toBeDefined();

      return new Promise((resolve) => resolve(mongoId));
    }
  }

  return new ExpensesRepositoryStub();
};

const makeSUT = () => {
  const input = {
    userId: new ObjectId().toString(),
    categoryId: new ObjectId().toString(),
    description: chance.word({ length: 50 }),
    value: 10,
    createAt: chance.date()
  };

  const mongoId = new ObjectId();
  const repository = makeRepository(input, mongoId.toString());
  const sut = new CreateExpenses(repository);

  return { sut, repository, input, mongoId };
};

describe('# Create Expense Test Integration', () => {
  it('should throw error when Database fails', async () => {
    const { sut, repository, input } = makeSUT();

    repository.save = jest
      .fn()
      .mockRejectedValueOnce(new Error('Internal Server Error'));

    await expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Internal Server Error')
    );
  });

  it('should create an expense', async () => {
    const { sut, input, mongoId } = makeSUT();
    let expenseId = await sut.execute(input);

    expect(expenseId).toStrictEqual(mongoId.toString());

    const { createAt, ...inputWitoutCreateAt } = input;

    expenseId = await sut.execute(inputWitoutCreateAt);

    expect(expenseId).toStrictEqual(mongoId.toString());
  });
});
