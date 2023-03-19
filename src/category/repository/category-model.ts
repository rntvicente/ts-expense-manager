import { ObjectId } from 'mongodb';

export class CategoryModel {
  constructor(readonly _id: ObjectId, readonly description: string) {}
}
