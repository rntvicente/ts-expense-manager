import Chance from 'chance';

import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';
import { User } from './user-entity';

describe('# Entity User Test Unit', () => {
  const chance = Chance();

  const id = new UniqueEntityIdVO().toString();
  const firstName = chance.first({ nationality: 'it' });
  const lastName = chance.last({ nationality: '*' });
  const email = chance.email();

  it('should throw error when not informe firstname', () => {
    expect(() => new User(id, '', lastName, email)).toThrow(
      new Error('Missing Param: First Name')
    );
  });

  it('should throw error when not informe lastname', () => {
    expect(() => new User(id, firstName, '', email)).toThrow(
      new Error('Missing Param: Last Name')
    );
  });

  it('should throw error when not informe email', () => {
    expect(() => new User(id, firstName, lastName, '')).toThrow(
      new Error('Invalid Field: E-mail')
    );
  });

  it('should create User with Unique Entity ID', () => {
    const user = new User('', firstName, lastName, email);

    expect(user.id).toBeInstanceOf(UniqueEntityIdVO);
  });

  it('should create User when informed id', () => {
    const user = new User(id, firstName, lastName, email);

    expect(user.id.toString()).toStrictEqual(id);
  });

  it('should get email when create User', () => {
    const user = new User(id, firstName, lastName, email);

    expect(user.email).toStrictEqual(email);
  });

  it('should get fullName when create User', () => {
    const user = new User(id, firstName, lastName, email);

    expect(user.fullName).toStrictEqual(`${firstName} ${lastName}`);
  });
});
