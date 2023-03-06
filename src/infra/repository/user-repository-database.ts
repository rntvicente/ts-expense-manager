import { MongoHelper } from '../database/helper-mongodb';
import {
  UserModel,
  UserRepository
} from '../../application/repositories/user-repository';
import { UniqueEntityIdVO } from '../../domains/value-object/unique-entity-id-vo';

const COLLECTION_NAME = 'user';

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly database: MongoHelper) {}

  async save(user: UserModel): Promise<UniqueEntityIdVO> {
    const collection = await this.database.getCollection(COLLECTION_NAME);
    const { insertedId } = await collection.insertOne(user);

    return new UniqueEntityIdVO(insertedId.toString());
  }
}
