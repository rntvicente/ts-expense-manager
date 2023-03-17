import { PasswordVO } from './password-vo';

describe('# Password Test Unit', () => {
  it('should throw error when password empty', async () => {
    await expect(() => PasswordVO.create('')).rejects.toThrow(
      new Error('Invalid Field: Password')
    );
  });

  it('should throw error when password less 8 char', async () => {
    await expect(() => PasswordVO.create('123')).rejects.toThrow(
      new Error('Invalid Field: Password')
    );
  });

  it('should throw error when password not found uppercase', async () => {
    await expect(() => PasswordVO.create('password')).rejects.toThrow(
      new Error('Invalid Field: Password')
    );
  });

  it('should throw error when password not found number', async () => {
    await expect(() => PasswordVO.create('Password')).rejects.toThrow(
      new Error('Invalid Field: Password')
    );
  });

  it('should throw error when password not found special char', async () => {
    await expect(() => PasswordVO.create('Password1')).rejects.toThrow(
      new Error('Invalid Field: Password')
    );
  });

  it('should create password when value accepted', async () => {
    const password = await PasswordVO.create('P4ssW@rd');

    expect(password).toBeDefined();
  });

  it('should return true when password is equal value encrypt', async () => {
    const password = await PasswordVO.create('P4ssW@rd');
    const isValid = await password.validatePassword('P4ssW@rd');

    expect(isValid).toBeTruthy();
  });

  it('should return false when password diff value encrypt', async () => {
    const password = await PasswordVO.create('P4ssW@rd');
    const isValid = await password.validatePassword('invalid_password');

    expect(isValid).toBeFalsy();
  });
});
