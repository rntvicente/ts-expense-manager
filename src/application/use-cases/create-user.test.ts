/* eslint-disable @typescript-eslint/no-unused-vars */
import Chance from 'chance';
import { ObjectId } from 'mongodb';

import { Hasher } from '../../shared/interfaces/hasher';

import { UserRepository } from '../../application/repositories/user-repository';
import { User } from '../../domains/users/user-entity';

import { CreateUser } from './create-user';

const chance = Chance();

const makeRepository = (mongoId: ObjectId): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async save(user: User): Promise<string> {
      return new Promise((resolve) => resolve(mongoId.toString()));
    }
  }

  return new UserRepositoryStub();
};

const makeEncrypter = (passwordHashed: string): Hasher => {
  class HasherStub implements Hasher {
    async hash(plaintext: string): Promise<string> {
      return new Promise((resolve) => resolve(passwordHashed));
    }

    compare(plaintext: string, hash: string): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
  }

  return new HasherStub();
};

const makeSUT = () => {
  const mongoId = new ObjectId();
  const passwordHashed = chance.guid();

  const repositoryStub = makeRepository(mongoId);
  const encrypterStub = makeEncrypter(passwordHashed);

  const sut = new CreateUser(repositoryStub, encrypterStub);

  return {
    mongoId,
    passwordHashed,
    sut,
    repositoryStub,
    encrypterStub
  };
};

describe('# Create User Integration Test', () => {
  const input = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: 'P4ssw@rd'
  };

  it('should call once Hash with param informed', async () => {
    const { sut, encrypterStub } = makeSUT();
    const hashSpy = jest.spyOn(encrypterStub, 'hash');
    await sut.execute(input);

    expect(hashSpy).toBeCalledWith('P4ssw@rd');
  });

  it('should throw error when Hash fails', async () => {
    const error = new Error('Internal Server Error');
    const { sut, encrypterStub, repositoryStub } = makeSUT();

    const saveSpy = jest.spyOn(repositoryStub, 'save');

    encrypterStub.hash = jest.fn().mockRejectedValueOnce(error);

    await expect(() => sut.execute(input)).rejects.toThrow(error);
    expect(encrypterStub.hash).toBeCalled();
    expect(saveSpy).not.toBeCalled();
  });

  it('should call once Repository', async () => {
    const { sut, repositoryStub, mongoId, passwordHashed } = makeSUT();
    const saveSpy = jest.spyOn(repositoryStub, 'save');
    await sut.execute(input);

    expect(saveSpy).toBeCalled();
  });

  it('should throw error when Repository fails', async () => {
    const error = new Error('Internal Server Error');
    const { encrypterStub, repositoryStub, sut } = makeSUT();

    repositoryStub.save = jest.fn().mockRejectedValueOnce(error);
    const hashSpy = jest.spyOn(encrypterStub, 'hash');

    await expect(() => sut.execute(input)).rejects.toThrow(error);
    expect(hashSpy).toBeCalled();
    expect(repositoryStub.save).toBeCalled();
  });

  it('should create an User', async () => {
    const { sut, mongoId } = makeSUT();
    const userId = await sut.execute(input);

    expect(userId).toStrictEqual(mongoId.toString());
  });
});
