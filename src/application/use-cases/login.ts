import { UserRepository } from '../repositories/user-repository';

export class Login {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string, password: string): Promise<boolean> {
    const storedUser = await this.repository.findOne({ email });

    if (!storedUser) throw new Error(`Not found user by filter ${email}.`);

    return;
  }
}
