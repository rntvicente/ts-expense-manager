import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

export type UserModel = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface UserRepository {
  save(user: UserModel): Promise<UniqueEntityIdVO>;
}
