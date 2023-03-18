import { CreateUser } from '../../auth/application/use-cases/signup';

import { MongoHelper } from '../database/helper-mongodb';
import { UserControllerAdapter } from '../../auth/controller/user-controller-adapter';
import { UserRepositoryDatabase } from '../../auth/repository/user-repository-database';

export const makeCreateUserController = (
  database: MongoHelper
): UserControllerAdapter => {
  const userRepository = new UserRepositoryDatabase(database);
  const createUser = new CreateUser(userRepository);
  return new UserControllerAdapter(createUser);
};
