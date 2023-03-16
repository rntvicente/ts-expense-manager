import Chance from 'chance';
import { ObjectId } from 'mongodb';

import { PasswordVO } from '../../shared/value-object/password-vo';

import { User } from '../../domains/users/user-entity';
import { UserModel } from '../models/user-model';
import { UserMapper } from './user-mapper';

describe('# Mapper User Test Unit', () => {
  const chance = Chance();

  const firstName = chance.first();
  const lastName = chance.last();
  const email = chance.email();

  it('should return instance User when call toDomain', async () => {
    const id = new ObjectId();
    const passwordVO = new PasswordVO('P4ssw@rd');
    const hashedPassword = await passwordVO.create();
    const model = new UserModel(firstName, lastName, email, hashedPassword, id);

    const user = UserMapper.toDomain(model);

    expect(user).toBeInstanceOf(User);
  });

  it('should return instance User Model when call toModel', async () => {
    const user = new User(firstName, lastName, email, 'P4ssw@rd');
    const modelUser = await UserMapper.toModel(user);

    expect(modelUser).toBeInstanceOf(UserModel);
  });
});
