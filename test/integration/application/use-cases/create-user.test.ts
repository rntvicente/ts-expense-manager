import { Collection } from 'mongodb';
import Chance from 'chance';

import { MongoHelper } from '../../../../src/infra/database/helper-mongodb';
import { CreateUser } from '../../../../src/application/use-cases/create-user';
import { UserRepositoryDatabase } from '../../../../src/infra/repository/user-repository-database';
import { UniqueEntityIdVO } from '../../../../src/domains/value-object/unique-entity-id-vo';

const chance = Chance();

describe('# Create User Test integration', () => {
  const mongoHelper = new MongoHelper();
  let collection: Collection;

  beforeAll(async () => {
    await mongoHelper.connect('mongodb://localhost:27017/jest-test');
    collection = await mongoHelper.getCollection('user');
  });

  beforeEach(async () => {
    await collection.deleteMany();
  });

  afterAll(async () => {
    await mongoHelper.close();
  });

  it('should not create User when not informed params', async () => {
    const instance = new CreateUser();

    const input = {
      firstName: '',
      lastName: '',
      email: ''
    };

    await expect(() => instance.execute(input)).rejects.toThrow(
      new Error('Missing Param: firstName,lastName,email')
    );
  });

  it('should create user', async () => {
    const userRepository = new UserRepositoryDatabase(mongoHelper);
    const createUser = new CreateUser(userRepository);

    const input = {
      firstName: chance.first({ nationality: 'it' }),
      lastName: chance.last({ nationality: '*' }),
      email: chance.email()
    };

    const insertedId = await createUser.execute(input);
    expect(insertedId).toBeInstanceOf(UniqueEntityIdVO);

    const user = await collection.findOne({ _id: insertedId.value });
    expect(user).toEqual({ ...input, _id: insertedId.value });
  });
});
