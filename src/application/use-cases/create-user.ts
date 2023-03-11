import { UserRepository } from '../repositories/user-repository';
import { User } from '../../domains/users/user-entity';

import { Hasher } from '../../shared/interfaces/hasher';
import { PasswordVO } from '../../shared/value-object/password-vo';

export class CreateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute(input: Input): Promise<string> {
    const passwordVO = new PasswordVO(input.password, this.hasher);
    const hashedPassword = await passwordVO.getHashedValue();

    const newUser = new User(
      input.firstName,
      input.lastName,
      input.email,
      hashedPassword
    );

    return await this.repository.save(newUser);
  }
}

type Input = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
