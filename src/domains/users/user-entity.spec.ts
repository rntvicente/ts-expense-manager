import Chance from 'chance';

import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';
import { User } from './user-entity';

describe('# Entity User Test Unit', () => {
  const chance = Chance();

  const id = new UniqueEntityIdVO().toString();
  const firstName = chance.first({ nationality: 'it' });
  const lastName = chance.last({ nationality: '*' });
  const email = chance.email();
  const password = chance.hash();

  it('should throw error when not informe firstname', () => {
    expect(() => new User('', lastName, email, password, id)).toThrow(
      new Error('Missing Param: First Name')
    );
  });

  it('should throw error when not informe lastname', () => {
    expect(() => new User(firstName, '', email, password, id)).toThrow(
      new Error('Missing Param: Last Name')
    );
  });

  it('should throw error when not informe email', () => {
    expect(() => new User(firstName, lastName, '', password, id)).toThrow(
      new Error('Invalid Field: E-mail')
    );
  });

  it('should throw error when not informe password', () => {
    expect(() => new User(firstName, lastName, email, '', id)).toThrow(
      new Error('Missing Param: Password')
    );
  });

  it('should create User with Unique Entity ID', () => {
    const user = new User(firstName, lastName, email, password);

    expect(user.id).toBeInstanceOf(UniqueEntityIdVO);
  });

  it('should create User when informed id', () => {
    const user = new User(firstName, lastName, email, password, id);

    expect(user.id.toString()).toStrictEqual(id);
    expect(user.firstname).toStrictEqual(firstName);
    expect(user.lastName).toStrictEqual(lastName);
    expect(user.password).toStrictEqual(password);
    expect(user.email).toStrictEqual(email);
    expect(user.fullName).toStrictEqual(`${firstName} ${lastName}`);
  });
});
