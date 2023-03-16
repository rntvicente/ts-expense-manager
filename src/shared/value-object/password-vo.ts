import bcrypt from 'bcrypt';
import { InvalidFieldError } from '../errors/invalid-field-error';

export class PasswordVO {
  private readonly _value: string;
  private readonly _salt = 12;

  constructor(password: string) {
    this._value = password;
    this.validate();
  }

  private validate() {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(this._value);
    
    if (!isValid) throw new InvalidFieldError('password');
  }

  async create(): Promise<string> {
    return await bcrypt.hash(this._value, this._salt);
  }

  async validatePassword(hash: string): Promise<boolean> {
    return await bcrypt.compare(this._value, hash);
  }
}
