import { User } from '../../domains/users/user-entity';
import { UserRepository } from '../repositories/user-repository';

export class Login {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const storedUser = await this.repository.findOne({ email });

    if (!storedUser) throw new Error(`Not found user by filter ${email}.`);

    const user = await User.create(
      storedUser.firstName,
      storedUser.lastName,
      storedUser.email,
      storedUser.password
    );

    const isValid = await user.validatePassword(password);

    if (!isValid) throw new Error('E-mail or Password invalid.');

    return '';
  }
}
