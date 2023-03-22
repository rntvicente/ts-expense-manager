import { ObjectId } from 'mongodb';

import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

import { Expense } from '../../expense/domains/expenses/expense-entity';
import { ExpenseModel } from '../../expense/repository/expense-model';

export class ExpenseMapper {
  static toDomain(model: ExpenseModel): Expense {
    return new Expense(
      new UniqueEntityIdVO(model._id),
      new UniqueEntityIdVO(model.userId),
      new UniqueEntityIdVO(model.categoryId),
      model.description,
      model.value,
      model.purchaseDate,
      model.createAt,
      model.updateAt
    );
  }

  static toModel(entity: Expense): ExpenseModel {
    return new ExpenseModel(
      new ObjectId(entity.userId.value),
      new ObjectId(entity.categoryId.value),
      entity.description,
      entity.value,
      entity.purchaseDate,
      entity.createAt,
      entity.updateAt,
      new ObjectId(entity.id.value)
    );
  }
}
