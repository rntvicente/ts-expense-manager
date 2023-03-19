/* eslint-disable @typescript-eslint/no-unused-vars */
import Chance from 'chance';
import { Document, Filter, FindOptions, ObjectId } from 'mongodb';

import { UserRepository } from '../repositories/user-repository';
import { User } from '../../domains/users/user-entity';
import { UserModel } from '../../repository/user-model';

import { SignIn } from './signup';

const chance = Chance();

const makeRepository = (mongoId: ObjectId): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async findOne(
      filter: Filter<Document>,
      options?: FindOptions<Document> | undefined
    ): Promise<UserModel | null> {
      throw new Error('Method not implemented.');
    }

    async save(user: User): Promise<string> {
      return new Promise((resolve) => resolve(mongoId.toString()));
    }
  }

  return new UserRepositoryStub();
};

const makeSUT = () => {
  const mongoId = new ObjectId();
  const passwordHashed = chance.guid();

  const repositoryStub = makeRepository(mongoId);

  const sut = new SignIn(repositoryStub);

  return {
    mongoId,
    passwordHashed,
    sut,
    repositoryStub
  };
};

describe('# Sign Up Integration Test', () => {
  const input = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: 'P4ssw@rd'
  };

  it('should call once Repository', async () => {
    const { sut, repositoryStub, mongoId, passwordHashed } = makeSUT();
    const saveSpy = jest.spyOn(repositoryStub, 'save');
    await sut.execute(input);

    expect(saveSpy).toBeCalled();
  });

  it('should throw error when Repository fails', async () => {
    const error = new Error('Internal Server Error');
    const { repositoryStub, sut } = makeSUT();

    repositoryStub.save = jest.fn().mockRejectedValueOnce(error);

    await expect(() => sut.execute(input)).rejects.toThrow(error);
    expect(repositoryStub.save).toBeCalled();
  });

  it('should create an User', async () => {
    const { sut, mongoId } = makeSUT();
    const userId = await sut.execute(input);

    expect(userId).toStrictEqual(mongoId.toString());
  });
});
