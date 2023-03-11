import { User } from '../../domains/users/user-entity';

export interface UserRepository {
  save(user: User): Promise<string>;
}
