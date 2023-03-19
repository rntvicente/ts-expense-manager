import { ObjectId } from 'mongodb';

import { CategoryModel } from '../../category/repository/category-model';
import { UserModel } from '../../auth/repository/user-model';

export class ExpenseModel {
  constructor(
    readonly _id: ObjectId,
    readonly user: Pick<UserModel, '_id' | 'email'>,
    readonly category: CategoryModel,
    readonly description: string,
    readonly value: number,
    readonly date: Date
  ) {}
}
