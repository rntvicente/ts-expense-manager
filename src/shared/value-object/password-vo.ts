import { InvalidFieldError } from '../errors/invalid-field-error';

import { BcryptHasher } from '../../infra/encrypter/bcrypt-hasher';

export class PasswordVO {
  private readonly _value: string;
  private readonly _encrypter: BcryptHasher;
  private readonly _salt: number;

  constructor(password: string, salt: number) {
    this._value = password;
    this._salt = salt
    this._encrypter = new BcryptHasher(salt);

    this.validate();
  }

  private validate() {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(this._value);

    if (!isValid) throw new InvalidFieldError('password');
  }

  private async hash(): Promise<string> {
    return await this._encrypter.hash(this._value);
  }

  async getHashedValue(): Promise<string> {
    return await this.hash();
  }
}
