import { InvalidFieldError } from '../errors/invalid-field-error';

import { Hasher } from '../../infra/encrypter/hasher';

export class PasswordVO {
  private readonly _value: string;
  private readonly _hasher: Hasher;

  constructor(password: string, hasher: Hasher) {
    this._value = password;
    this._hasher = hasher;

    this.validate();
  }

  private validate() {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(this._value);

    if (!isValid) throw new InvalidFieldError('password');
  }

  private async hash(): Promise<string> {
    return await this._hasher.hash(this._value);
  }

  async getHashedValue(): Promise<string> {
    return await this.hash();
  }
}
