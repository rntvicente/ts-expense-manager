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
  let userEntity: User;
  let userModel: UserModel;

  beforeEach(async () => {
    userEntity = await User.create(
      firstName,
      lastName,
      email,
      'P4ssw@rd',
      id.toString()
    );

    userModel = new UserModel(
      firstName,
      lastName,
      email,
      userEntity.password.value,
      id
    );
  });

  it('should return instance User when call toDomain', async () => {
    const entity = UserMapper.toDomain(userModel);

    expect(entity.email).toBeInstanceOf(EmailVO);
    expect(entity.firstName).toStrictEqual(firstName);
    expect(entity.lastName).toStrictEqual(lastName);
    expect(entity.id).toBeInstanceOf(UniqueEntityIdVO);
    expect(entity.password).toBeInstanceOf(PasswordVO);
  });

  it('should return instance User Model when call toModel', async () => {
    const model = await UserMapper.toModel(userEntity);

    expect(model._id).toBeInstanceOf(ObjectId);
    expect(model.email).toStrictEqual(email);
    expect(model.firstName).toStrictEqual(firstName);
    expect(model.lastName).toStrictEqual(lastName);
    expect(model.password).toStrictEqual(userEntity.password.value);
  });
});
