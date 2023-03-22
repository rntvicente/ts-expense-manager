import Chance from 'chance';
import { ObjectId } from 'mongodb';

import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';
import { Expense } from './expense-entity';

describe('# Expenses Unit Test', () => {
  const chance = Chance();

  const description = chance.word({ length: 80 });
  const value = 100.1;
  const userId = new ObjectId().toString();
  const categoryId = new ObjectId().toString();

  it('should throw error when userId empty', () => {
    expect(() => Expense.create('', categoryId, description, value)).toThrow(
      new Error('Missing Param: User')
    );
  });

  it('should throw error when categoryId empty', () => {
    expect(() => Expense.create(userId, '', description, value)).toThrow(
      new Error('Missing Param: Category')
    );
  });

  it('should throw error when descryption empty', () => {
    expect(() => Expense.create(userId, categoryId, '', value)).toThrow(
      new Error('Missing Param: Description')
    );
  });

  it('should throw error when value invalid', () => {
    expect(() => Expense.create(userId, categoryId, description, 0)).toThrow(
      new Error('Invalid Field: Value')
    );

    expect(() => Expense.create(userId, categoryId, description, -10)).toThrow(
      new Error('Invalid Field: Value')
    );
  });

  it('should create expense', () => {
    const createAt = new Date();
    const purchaseDate = new Date();

    const expense = Expense.create(
      userId,
      categoryId,
      description,
      value,
      purchaseDate,
      createAt
    );

    expect(expense).toBeInstanceOf(Expense);
    expect(expense.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(expense.userId).toBeInstanceOf(UniqueEntityIdVO);
    expect(expense.categoryId).toBeInstanceOf(UniqueEntityIdVO);
    expect(expense.description).toStrictEqual(description);
    expect(expense.value).toStrictEqual(value);
    expect(expense.purchaseDate).toStrictEqual(purchaseDate);
    expect(expense.createAt).toStrictEqual(createAt);
  });
});
