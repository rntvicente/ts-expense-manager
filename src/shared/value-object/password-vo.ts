import bcrypt from 'bcrypt';
import { InvalidFieldError } from '../errors/invalid-field-error';

export class PasswordVO {
  private static readonly _salt = 12;

  constructor(readonly value: string) {}

  static async create(password: string): Promise<PasswordVO> {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(password);

    if (!isValid) throw new InvalidFieldError('Password');

    const hashed = await bcrypt.hash(password, this._salt);
    return new PasswordVO(hashed);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.value);
  }
}
