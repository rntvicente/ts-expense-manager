import { InvalidFieldError } from '../errors/invalid-field-error';
import { MissingParamError } from '../errors/missing-param-error';

import { Hasher } from '../../shared/interfaces/hasher';

export class PasswordVO {
  private readonly _value: string;
  private readonly _createAt: Date;
  private readonly _hasher: Hasher;

  constructor(
    private readonly password: string,
    private readonly hasher: Hasher
  ) {
    this._value = password;
    this._createAt = new Date();
    this._hasher = hasher;

    this.validate();
  }

  private validate() {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!this._value) throw new MissingParamError('password');
    if (this._value.length < 8) throw new InvalidFieldError('password');
    if (!regex.test(this._value)) throw new InvalidFieldError('password');
  }

  private async hash(): Promise<string> {
    return this._hasher.hash(this._value);
  }

  get createAt() {
    return this._createAt;
  }

  async getHashedValue(): Promise<string> {
    return await this.hash();
  }
}
