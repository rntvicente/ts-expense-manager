import { ObjectId } from 'mongodb';

export class ExpenseModel {
  constructor(
    readonly userId: ObjectId,
    readonly categoryId: ObjectId,
    readonly description: string,
    readonly value: number,
    readonly createAt: Date,
    readonly _id: ObjectId | undefined
  ) {}
}
