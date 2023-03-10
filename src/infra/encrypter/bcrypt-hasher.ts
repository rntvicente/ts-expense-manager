import bcrypt from 'bcrypt';

import { Hasher } from '../../shared/interfaces/hasher';

export class BcryptHasher implements Hasher {
  private readonly _salt: number;

  constructor(readonly salt: number) {
    this._salt = salt;
  }

  async hash(plaintext: string): Promise<string> {
    const hash = await bcrypt.hash(plaintext, this._salt);
    return hash;
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }
}
