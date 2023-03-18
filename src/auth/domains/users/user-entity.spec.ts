import Chance from 'chance';

import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';
import { User } from './user-entity';

describe('# Entity User Test Unit', () => {
  const chance = Chance();

  const id = new UniqueEntityIdVO().toString();
  const firstName = chance.first({ nationality: 'it' });
  const lastName = chance.last({ nationality: '*' });
  const email = chance.email();
  const password = 'P4ssw@rd';

  it('should throw error when not informe firstname', async () => {
    await expect(() =>
      User.create('', lastName, email, password, id)
    ).rejects.toThrow(new Error('Missing Param: First Name'));
  });

  it('should throw error when not informe lastname', async () => {
    await expect(() =>
      User.create(firstName, '', email, password, id)
    ).rejects.toThrow(new Error('Missing Param: Last Name'));
  });

  it('should throw error when not informe email', async () => {
    await expect(() =>
      User.create(firstName, lastName, '', password, id)
    ).rejects.toThrow(new Error('Invalid Field: E-mail'));
  });

  it('should throw error when not informe password', async () => {
    await expect(() =>
      User.create(firstName, lastName, email, '', id)
    ).rejects.toThrow(new Error('Missing Param: Password'));
  });

  it('should create User with Unique Entity ID', async () => {
    const user = await User.create(firstName, lastName, email, password);

    expect(user.id).toBeInstanceOf(UniqueEntityIdVO);
  });

  it('should create User when informed id', async () => {
    const user = await User.create(firstName, lastName, email, password, id);

    expect(user.id.toString()).toStrictEqual(id);
    expect(user.firstName).toStrictEqual(firstName);
    expect(user.lastName).toStrictEqual(lastName);
    expect(user.password).toBeDefined();
    expect(user.email.value).toStrictEqual(email);
    expect(user.fullName).toStrictEqual(`${firstName} ${lastName}`);
    expect(await user.validatePassword('password')).toBeFalsy();
    expect(await user.validatePassword(password)).toBeTruthy();

  });
});
