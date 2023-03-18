import { Document, Filter, FindOptions } from 'mongodb';

import { UserModel } from '../../repository/user-model';
import { User } from '../../domains/users/user-entity';

export interface UserRepository {
  save(user: User): Promise<string>;
  findOne(
    filter: Filter<Document>,
    options?: FindOptions<Document>
  ): Promise<UserModel | null>;
}
