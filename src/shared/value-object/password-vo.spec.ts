import { BcryptHasher } from '../../infra/encrypter/bcrypt-hasher';

import { PasswordVO } from './password-vo';

const makeSut = (): BcryptHasher => {
  return new BcryptHasher(10);
};

describe('# Password Test Unit', () => {
  const sut = makeSut();

  it('should throw error when password empty', () => {
    expect(() => new PasswordVO('', sut)).toThrow(
      new Error('Missing Param: password')
    );
  });

  it('should throw error when password less 8 char', () => {
    expect(() => new PasswordVO('123', sut)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should throw error when password not found uppercase', () => {
    expect(() => new PasswordVO('password', sut)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should throw error when password not found number', () => {
    expect(() => new PasswordVO('Password', sut)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should throw error when password not found special char', () => {
    expect(() => new PasswordVO('P4ssw0rd', sut)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should create password when value accepted', async () => {
    const createAt = new Date(2023, 0, 1);
    jest.useFakeTimers().setSystemTime(createAt);

    const password = new PasswordVO('P4ssW@rd', sut);
    const passwordHashed = await password.getHashedValue();

    expect(password.createAt).toStrictEqual(createAt);
    expect(passwordHashed).toBeDefined();
  });
});
