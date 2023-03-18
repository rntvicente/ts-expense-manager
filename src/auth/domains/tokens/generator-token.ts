import { sign, verify, VerifyOptions } from 'jsonwebtoken';

import { User } from '../users/user-entity';

export class GeneratorToken {
  private readonly _key: string;
  private readonly _opts: VerifyOptions = {
    algorithms: ['HS256']
  };

  constructor(private readonly key) {
    this._key = key;
  }

  generate({ email }: User, expiresIn: number, issuedAt: Date): string {
    return sign({ email: email.value, iat: issuedAt.getTime() }, this._key, {
      expiresIn
    });
  }

  verify(token: string) {
    return verify(token, this._key, this._opts);
  }
}
