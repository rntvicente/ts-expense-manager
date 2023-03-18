import { PasswordVO } from '../../../shared/value-object/password-vo';
import { UserMapper } from '../../../infra/mappers/user-mapper';

import { UserRepository } from '../repositories/user-repository';
import { GeneratorToken } from '../../domains/tokens/generator-token';

export class Login {
  private readonly _now = Date.now();
  private readonly _expiresIn = Math.floor(this._now / 1000) + 10 * 60;

  constructor(private readonly repository: UserRepository) {}

  async execute(email: string, password: string): Promise<Output> {
    const storedUser = await this.repository.findOne({ email });

    if (!storedUser) throw new Error(`Not found user by filter ${email}.`);

    const passwordVO = new PasswordVO(storedUser.password);
    const isValid = await passwordVO.validatePassword(password);

    if (!isValid) throw new Error('E-mail or Password invalid.');

    const generateToken = new GeneratorToken(process.env.TOKEN_KEY);

    const user = UserMapper.toDomain(storedUser);

    return {
      token: generateToken.generate(user, this._expiresIn, new Date(this._now))
    };
  }
}

type Output = {
  token: string;
};
