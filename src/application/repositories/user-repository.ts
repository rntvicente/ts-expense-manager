import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserRepository {
  save(user: UserModel): Promise<UniqueEntityIdVO>;
}
