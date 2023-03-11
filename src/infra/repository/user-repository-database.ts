import { MongoHelper } from '../database/helper-mongodb';
import { UserMapper } from '../mappers/user-mapper';

import { UserRepository } from '../../application/repositories/user-repository';
import { User } from '../../domains/users/user-entity';

const COLLECTION_NAME = 'user';

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly database: MongoHelper) {}

  async save(user: User): Promise<string> {
    const model = UserMapper.toModel(user);

    const collection = await this.database.getCollection(COLLECTION_NAME);
    const { insertedId } = await collection.insertOne(model);

    return insertedId.toString();
  }
}
