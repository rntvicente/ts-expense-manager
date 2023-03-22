import { MissingParamError } from '../../../shared/errors/missing-param-error';
import { InvalidFieldError } from '../../../shared/errors/invalid-field-error';
import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';

export class Expense {
  constructor(
    readonly id: UniqueEntityIdVO,
    readonly userId: UniqueEntityIdVO,
    readonly categoryId: UniqueEntityIdVO,
    readonly description: string,
    readonly value: number,
    readonly purchaseDate: Date,
    readonly createAt: Date,
    readonly updateAt?: Date
  ) {}

  static create(
    userId: string,
    categoryId: string,
    description: string,
    value: number,
    purchaseDate = new Date(),
    createAt = new Date(),
    id?: string
  ): Expense {
    if (!userId) throw new MissingParamError('User');
    if (!categoryId) throw new MissingParamError('Category');
    if (!description) throw new MissingParamError('Description');
    if (value <= 0) throw new InvalidFieldError('Value');

    return new Expense(
      new UniqueEntityIdVO(id),
      new UniqueEntityIdVO(userId),
      new UniqueEntityIdVO(categoryId),
      description,
      value,
      purchaseDate,
      createAt
    );
  }
}
