import { ObjectId } from 'mongodb';

import { EmailVO } from '../../shared/value-object/email-vo';
import { PasswordVO } from '../../shared/value-object/password-vo';
import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

import { User } from '../../auth/domains/users/user-entity';
import { UserModel } from '../../auth/repository/user-model';

export class UserMapper {
  static toDomain(userModel: UserModel): User {
    return new User(
      userModel.firstName,
      userModel.lastName,
      new EmailVO(userModel.email),
      new PasswordVO(userModel.password),
      new UniqueEntityIdVO(userModel._id)
    );
  }

  static async toModel(user: User): Promise<UserModel> {
    const password = await user.password.value;
    const email = await user.email.value;

    return new UserModel(
      user.firstName,
      user.lastName,
      email,
      password,
      new ObjectId(user.id.value)
    );
  }
}
