import { Document, Filter, FindOptions } from 'mongodb';

import { UserModel } from '../../infra/models/user-model';
import { User } from '../../domains/users/user-entity';

export interface UserRepository {
  save(user: User): Promise<string>;
  findOne(
    filter: Filter<Document>,
    optins: FindOptions<Document>
  ): Promise<UserModel | null>;
}
