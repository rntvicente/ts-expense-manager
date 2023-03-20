import Chance from 'chance';

import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

import { Expense } from '../../expense/domains/expenses/expense-entity';
import { ExpenseModel } from '../../expense/repository/expense-model';

import { ExpenseMapper } from './expense-mapper';
import { ObjectId } from 'mongodb';

describe('# Expense Mapper Test unit', () => {
  const chance = Chance();

  let expenseModel: ExpenseModel;
  let expenseEntity: Expense;

  const id = new UniqueEntityIdVO();
  const userId = new UniqueEntityIdVO();
  const categoryId = new UniqueEntityIdVO();
  const description = chance.word({ length: 50 });
  const value = 100.1;
  const createAt = chance.date();

  beforeEach(() => {
    expenseEntity = new Expense(
      id,
      userId,
      categoryId,
      description,
      value,
      createAt
    );

    expenseModel = new ExpenseModel(
      new ObjectId(userId.value),
      new ObjectId(categoryId.value),
      description,
      value,
      createAt,
      new ObjectId(id.value)
    );
  });

  it('should return instance Expense when call toDomain', () => {
    const entity = ExpenseMapper.toDomain(expenseModel);

    expect(entity).toBeInstanceOf(Expense);
    expect(entity.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(entity.userId).toBeInstanceOf(UniqueEntityIdVO);
    expect(entity.categoryId).toBeInstanceOf(UniqueEntityIdVO);
    expect(entity.description).toBeDefined();
    expect(entity.value).toBeDefined();
    expect(entity.createAt).toBeDefined();
  });

  it('should return instance ExpenseModel when call toModel', () => {
    const model = ExpenseMapper.toModel(expenseEntity);

    expect(model).toBeInstanceOf(ExpenseModel);
    expect(model._id).toBeInstanceOf(ObjectId);
    expect(model.userId).toBeInstanceOf(ObjectId);
    expect(model.categoryId).toBeInstanceOf(ObjectId);
    expect(model.description).toBeDefined();
    expect(model.value).toBeDefined();
    expect(model.createAt).toBeDefined();
  });
});
