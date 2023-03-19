import { UserRepository } from '../repositories/user-repository';
import { User } from '../../domains/users/user-entity';

export class SignIn {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: Input): Promise<string> {
    const newUser = await User.create(
      input.firstName,
      input.lastName,
      input.email,
      input.password
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
