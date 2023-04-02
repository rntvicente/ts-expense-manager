import { ObjectId } from 'mongodb';
import Chance from 'chance';

import { Expense } from '../../domains/expenses/expense-entity';
import { ExpenseModel } from '../../repository/expense-model';
import {
  ExpenseFilter,
  ExpensesRepository
} from '../repository/expenses-repository';

import { UpdateExpenses } from './update-expenses';

const chance = Chance();

const makeRepository = (expensesId: ObjectId, expectedModel: ExpenseModel) => {
  class ExpensesRepositoryStub implements ExpensesRepository {
    async save(expense: Expense): Promise<string> {
      return expense.id.toString();
    }

    async findOne(filter: ExpenseFilter): Promise<ExpenseModel | null> {
      expect(filter).toStrictEqual({ _id: expensesId });

      return {
        _id: expensesId,
        userId: expectedModel.userId,
        categoryId: new ObjectId(),
        description: chance.word({ length: 25 }),
        value: 100,
        purchaseDate: chance.date(),
        createAt: expectedModel.createAt,
        updateAt: undefined
      };
    }

    async findOneAndUpdate(
      filter: ExpenseFilter,
      model: ExpenseModel
    ): Promise<void> {
      expect(filter).toStrictEqual({ _id: expensesId });
      expect(model).toEqual(expectedModel);
    }
  }

  return new ExpensesRepositoryStub();
};

const makeSUT = () => {
  const expenseId = new ObjectId();
  const userId = new ObjectId();
  const categoryId = new ObjectId();

  const document = {
    categoryId,
    description: chance.word({ length: 25 }),
    value: 1000,
    purchaseDate: chance.date()
  };

  const input = { expenseId: expenseId.toString(), document };

  const expectedModel = {
    _id: expenseId,
    userId,
    categoryId: document.categoryId,
    description: document.description,
    value: document.value,
    purchaseDate: document.purchaseDate,
    createAt: chance.date(),
    updateAt: new Date()
  };

  const repository = makeRepository(expenseId, expectedModel);
  const sut = new UpdateExpenses(repository);

  return { repository, sut, input };
};

describe('# Update Expense Test Integration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should throw error when invalid expenseId', async () => {
    const { sut, input } = makeSUT();

    await expect(() =>
      sut.execute({ ...input, expenseId: 'invalid_id' })
    ).rejects.toThrow(new Error('Invalid Field: ExpenseId'));
  });

  it('should throw error when not found expense', async () => {
    const { sut, repository, input } = makeSUT();

    repository.findOne = jest.fn().mockResolvedValueOnce(null);

    await expect(() => sut.execute(input)).rejects.toThrow(
      new Error(`Expense not found to id ${input.expenseId}.`)
    );
  });

  it('should throw error when finOne fails', async () => {
    const { sut, repository, input } = makeSUT();

    repository.findOneAndUpdate = jest.fn();
    repository.findOne = jest
      .fn()
      .mockRejectedValueOnce(new Error('Internal Server Error'));

    await expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Internal Server Error')
    );
    expect(repository.findOneAndUpdate).not.toBeCalled();
  });

  it('should update expected correctly', async () => {
    const { sut, input } = makeSUT();

    await sut.execute(input);
  });
});
