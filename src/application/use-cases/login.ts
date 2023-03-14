import { Hasher } from '../../infra/encrypter/hasher';

import { UserRepository } from '../repositories/user-repository';

export class Login {
  constructor(
    private readonly repository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute(email: string, password: string): Promise<boolean> {
    const user = await this.repository.findOne({ email });

    if (!user) throw new Error(`Not found user by filter ${email}.`);

    const plaintext = await this.hasher.hash(password);

    return await this.hasher.compare(plaintext, user.password);
  }
}
