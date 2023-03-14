import { Filter, Document, FindOptions, ObjectId } from 'mongodb';
import Chance from 'chance';

import { User } from '../../domains/users/user-entity';
import { Hasher } from '../../infra/encrypter/hasher';
import { UserModel } from '../../infra/models/user-model';
import { UserRepository } from '../repositories/user-repository';

import { Login } from './login';

const chance = Chance();

const makeRepository = (plaintext: string) => {
  class UserRepositoryStub implements UserRepository {
    async save(user: User): Promise<string> {
      throw new Error('Method not implemented.');
    }

    findOne(
      filter: Filter<Document>,
      options?: FindOptions<Document> | undefined
    ): Promise<UserModel | null> {
      return new Promise((resolve) =>
        resolve({
          _id: new ObjectId(),
          firstName: chance.first(),
          lastName: chance.last(),
          email: chance.email(),
          password: plaintext
        })
      );
    }
  }

  return new UserRepositoryStub();
};

const makeEncrypter = (plaintext: string) => {
  class EncrypterStub implements Hasher {
    async hash(plaintext: string): Promise<string> {
      return new Promise((resolve) => resolve(plaintext));
    }

    async compare(plaintext: string, encrypted: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new EncrypterStub();
};

const makeSUT = () => {
  const plaintext = chance.hash();

  const repositoryStub = makeRepository(plaintext);
  const hasherStub = makeEncrypter(plaintext);

  const sut = new Login(repositoryStub, hasherStub);

  return { sut, repository: repositoryStub, hasher: hasherStub, plaintext };
};

describe('# Login Test Integration', () => {
});
