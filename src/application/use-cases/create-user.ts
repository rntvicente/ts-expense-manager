import { User } from '../../domains/users/user-entity';
import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

import { UserRepository } from '../repositories/user-repository';

export class CreateUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: Input): Promise<UniqueEntityIdVO> {
    const newUser = new User(
      null,
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
