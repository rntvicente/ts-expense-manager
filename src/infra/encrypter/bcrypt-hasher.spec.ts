import Bcrypt from 'bcrypt';

import { BcryptHasher } from './bcrypt-hasher';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => resolve('hash'));
  },

  async compare(): Promise<boolean> {
    return await new Promise((resolve) => resolve(true));
  }
}));

const salt = 12;
const makeSut = (): BcryptHasher => {
  return new BcryptHasher(salt);
};

describe('# Bcrypt Test Unit', () => {
  it('should calls Bcrypt with correct value', async () => {
    const hashSpy = jest.spyOn(Bcrypt, 'hash');
    const sut = makeSut();

    await sut.hash('any_value');
    expect(hashSpy).toBeCalledWith('any_value', salt);
  });

  it('should returns a hash on success', async () => {
    const sut = makeSut();

    const hash = await sut.hash('any_value');
    expect(hash).toBe('hash');
  });

  it('should return true when hash equal', async () => {
    const sut = makeSut();

    const hash = await sut.hash('any_value');
    const isEqual = sut.compare(hash, hash);

    expect(isEqual).toBeTruthy();
  });
});
