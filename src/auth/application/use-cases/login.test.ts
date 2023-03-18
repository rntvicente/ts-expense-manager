import { Filter, Document, FindOptions } from 'mongodb';
import { verify } from 'jsonwebtoken';
import Chance from 'chance';

import { UserModel } from '../../repository/user-model';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../../domains/users/user-entity';
import { UserMapper } from '../../../infra/mappers/user-mapper';

import { Login } from './login';

const chance = Chance();
const password = 'P4ssw@rd';
const email = chance.email();

const makeRepository = () => {
  class UserRepositoryStub implements UserRepository {
    async save(user: User): Promise<string> {
      throw new Error('Method not implemented.');
    }

    async findOne(
      filter: Filter<Document>,
      options?: FindOptions<Document> | undefined
    ): Promise<UserModel | null> {
      expect(filter).toEqual({ email });

      const user = await User.create(
        chance.first(),
        chance.last(),
        email,
        password
      );

      return UserMapper.toModel(user);
    }
  }

  return new UserRepositoryStub();
};

const makeSUT = () => {
  const repository = makeRepository();
  const sut = new Login(repository);

  return { sut, repository };
};

describe('# Login test Integration', () => {
  it('should throw error when not found user', async () => {
    const { sut, repository } = makeSUT();
    repository.findOne = jest.fn().mockResolvedValueOnce(null);

    await expect(() => sut.execute(email, password)).rejects.toThrow(
      new Error(`Not found user by filter ${email}.`)
    );
  });

  it('should throw error when invalid password', async () => {
    const { sut } = makeSUT();

    await expect(() => sut.execute(email, 'invalid_password')).rejects.toThrow(
      new Error('E-mail or Password invalid.')
    );
  });

  it('should return valid token', async () => {
    const { sut } = makeSUT();

    const { token } = await sut.execute(email, password);

    expect(token).toBeDefined();

    verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      expect(err).toBeNull();

      expect(decoded.email).toStrictEqual(email);
    });
  });
});
