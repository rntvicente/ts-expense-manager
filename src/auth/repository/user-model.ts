import { ObjectId } from 'mongodb';

export class UserModel {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly _id: ObjectId | undefined
  ) {}
}
