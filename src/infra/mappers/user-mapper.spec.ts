import Chance from 'chance';
import { ObjectId } from 'mongodb';

import { EmailVO } from '../../shared/value-object/email-vo';
import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';
import { PasswordVO } from '../../shared/value-object/password-vo';

import { User } from '../../auth/domains/users/user-entity';
import { UserModel } from '../../auth/repository/user-model';
import { UserMapper } from './user-mapper';

describe('# Mapper User Test Unit', () => {
  const chance = Chance();

  const firstName = chance.first();
  const lastName = chance.last();
  const email = chance.email();
  const id = new ObjectId();
  let user: User;

  beforeEach(async () => {
    user = await User.create(
      firstName,
      lastName,
      email,
      'P4ssw@rd',
      id.toString()
    );
  });

  it('should return instance User when call toDomain', async () => {
    const model = new UserModel(
      firstName,
      lastName,
      email,
      user.password.value,
      id
    );

    const userEntity = UserMapper.toDomain(model);
    expect(userEntity.email).toBeInstanceOf(EmailVO);
    expect(userEntity.firstName).toStrictEqual(firstName);
    expect(userEntity.lastName).toStrictEqual(lastName);
    expect(userEntity.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(userEntity.password).toBeInstanceOf(PasswordVO);
  });

  it('should return instance User Model when call toModel', async () => {
    const modelUser = await UserMapper.toModel(user);

    expect(modelUser._id).toBeInstanceOf(ObjectId);
    expect(modelUser.email).toStrictEqual(email);
    expect(modelUser.firstName).toStrictEqual(firstName);
    expect(modelUser.lastName).toStrictEqual(lastName);
    expect(modelUser.password).toStrictEqual(user.password.value);
  });
});
