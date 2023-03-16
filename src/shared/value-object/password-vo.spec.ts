import { PasswordVO } from './password-vo';

const SALT = 10;

describe('# Password Test Unit', () => {
  it('should throw error when password empty', () => {
    expect(() => new PasswordVO('', SALT)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should throw error when password less 8 char', () => {
    expect(() => new PasswordVO('123', SALT)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should throw error when password not found uppercase', () => {
    expect(() => new PasswordVO('password', SALT)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should throw error when password not found number', () => {
    expect(() => new PasswordVO('Password', SALT)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should throw error when password not found special char', () => {
    expect(() => new PasswordVO('Password1', SALT)).toThrow(
      new Error('Invalid Field: password')
    );
  });

  it('should create password when value accepted', async () => {
    const password = new PasswordVO('P4ssW@rd');
    const passwordHashed = await password.create();

    expect(passwordHashed).toBeDefined();
  });

  it('should return true when password is equal value encrypt', async () => {
    const password = new PasswordVO('P4ssW@rd');
    const storedHash = await password.create();

    const isValid = await password.validatePassword(storedHash);
    expect(isValid).toBeTruthy();
  });

  it('should return false when password diff value encrypt', async () => {
    const password = new PasswordVO('P4ssW@rd');
    await password.create();

    const isValid = await password.validatePassword('invalid_hash');
    expect(isValid).toBeFalsy();
  });
});
