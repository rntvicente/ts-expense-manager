import { MissingParamError } from '../../shared/errors/missing-param-error';
import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';
import { UserModel, UserRepository } from '../repositories/user-repository';

export class CreateUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: UserModel): Promise<UniqueEntityIdVO> {
    this.validate(input);
    return await this.repository.save(input);
  }

  private validate(input: UserModel) {
    const fields: string[] = [];

    for (const key in input) {
      if (!input[key]) fields.push(key);
    }

    if (fields.length > 0) throw new MissingParamError(fields);
  }
}
