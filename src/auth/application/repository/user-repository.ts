import { FindOptions, ObjectId } from 'mongodb';

import { UserModel } from '../../repository/user-model';
import { User } from '../../domains/users/user-entity';

export type UserFilter = {
  _id?: ObjectId;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export interface UserRepository {
  save(user: User): Promise<string>;
  findOne(
    filter: UserFilter,
    options?: FindOptions<UserModel>
  ): Promise<UserModel | null>;
}
