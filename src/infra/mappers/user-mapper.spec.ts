import Chance from 'chance';
import { ObjectId } from 'mongodb';

import { User } from '../../domains/users/user-entity';
import { UserModel } from '../models/user-model';

import { UserMapper } from './user-mapper';

describe('# Mapper User Test Unit', () => {
  const chance = Chance();

  const id = new ObjectId();
  const firstName = chance.first();
  const lastName = chance.last();
  const email = chance.email();
  const password = chance.hash();

  it('should return instance User Entity when call toDomain', () => {
    const entityUser = UserMapper.toDomain({
      id,
      firstName,
      lastName,
      email,
      password
    });

    expect(entityUser).toBeInstanceOf(User);
  });

  it('should return instance User Model when call toModel', () => {
    const modelUser = UserMapper.toModel({
      id,
      firstName,
      lastName,
      email,
      password
    });

    expect(modelUser).toBeInstanceOf(UserModel);
  });
});
