import { MongoHelper } from '../database/helper-mongodb';
import { Filter, Document, FindOptions } from 'mongodb';

import { UserMapper } from '../mappers/user-mapper';

import { UserRepository } from '../../application/repositories/user-repository';
import { User } from '../../domains/users/user-entity';
import { UserModel } from '../models/user-model';

const COLLECTION_NAME = 'users';

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly database: MongoHelper) {}

  async findOne(
    filter: Filter<Document>,
    options?: FindOptions<Document>
  ): Promise<UserModel | null> {
    const collection = await this.database.getCollection(COLLECTION_NAME);
    return await collection.findOne<UserModel | null>(filter, options);
  }

  async save(user: User): Promise<string> {
    const model = await UserMapper.toModel(user);

    const collection = await this.database.getCollection(COLLECTION_NAME);
    const { insertedId } = await collection.insertOne(model);

    return insertedId.toString();
  }
}
