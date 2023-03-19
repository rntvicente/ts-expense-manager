import { MissingParamError } from '../../../shared/errors/missing-param-error';
import { InvalidFieldError } from '../../../shared/errors/invalid-field-error';

export class Expenses {
  constructor(
    readonly userId: string,
    readonly description: string,
    readonly value: number,
    readonly date: Date,
    readonly categoryId: string
  ) {}

  static async create(
    userId: string,
    description: string,
    value: number,
    categoryId: string,
    date: Date = new Date()
  ): Promise<Expenses> {
    if (!userId) throw new MissingParamError('User');
    if (!description) throw new MissingParamError('Description');
    if (value <= 0) throw new InvalidFieldError('Value');
    if (!categoryId) throw new MissingParamError('Category');

    return new Expenses(userId, description, value, date, categoryId);
  }
}
