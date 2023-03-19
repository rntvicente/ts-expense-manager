import Chance from 'chance';

import { Expenses } from './expenses-entity';

describe('# Expenses Unit Test', () => {
  const chance = Chance();

  const description = chance.word({ length: 80 });
  const value = 100.1;
  const userId = chance.guid({ version: 4 });
  const categoryId = chance.guid({ version: 4 });

  it('should throw error when user empty', async () => {
    await expect(() =>
      Expenses.create('', description, value, categoryId)
    ).rejects.toThrow(new Error('Missing Param: User'));
  });

  it('should throw error when descryption empty', async () => {
    await expect(() =>
      Expenses.create(userId, '', value, categoryId)
    ).rejects.toThrow(new Error('Missing Param: Description'));
  });

  it('should throw error when value invalid', async () => {
    await expect(() =>
      Expenses.create(userId, description, 0, categoryId)
    ).rejects.toThrow(new Error('Invalid Field: Value'));

    await expect(() =>
      Expenses.create(userId, description, -10, categoryId)
    ).rejects.toThrow(new Error('Invalid Field: Value'));
  });

  it('should throw error when category empty', async () => {
    await expect(() =>
      Expenses.create(userId, description, value, '')
    ).rejects.toThrow(new Error('Missing Param: Category'));
  });

  it('should create expense', async () => {
    const createAt = new Date();

    const expense = await Expenses.create(
      userId,
      description,
      value,
      categoryId,
      createAt
    );

    expect(expense).toBeInstanceOf(Expenses);
    expect(expense.categoryId).toStrictEqual(categoryId);
    expect(expense.userId).toStrictEqual(userId);
    expect(expense.description).toStrictEqual(description);
    expect(expense.value).toStrictEqual(value);
    expect(expense.date).toStrictEqual(createAt);
  });
});
