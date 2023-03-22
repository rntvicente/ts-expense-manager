import { ObjectId } from 'mongodb';

export class ExpenseModel {
  constructor(
    readonly userId: ObjectId,
    readonly categoryId: ObjectId,
    readonly description: string,
    readonly value: number,
    readonly purchaseDate: Date,
    readonly createAt: Date,
    readonly updateAt: Date | undefined,
    readonly _id: ObjectId | undefined
  ) {}
}
