import { ObjectId } from 'mongodb';
import { User } from '../../domains/users/user-entity';
import { UserModel } from '../models/user-model';

export class UserMapper {
  static toDomain(userModel: UserModel): User {
    return new User(
      userModel.firstName,
      userModel.lastName,
      userModel.email,
      userModel.password,
      userModel._id?.toString()
    );
  }

  static toModel(user: User): UserModel {
    return new UserModel(
      user.firstname,
      user.lastName,
      user.email,
      user.password,
      new ObjectId(user.id.value)
    );
  }
}
