import { CreateUser } from '../../application/use-cases/create-user';

import { MongoHelper } from '../database/helper-mongodb';
import { UserControllerAdapter } from '../controller/user-controller-adapter';
import { BcryptHasher } from '../encrypter/bcrypt-hasher';
import { UserRepositoryDatabase } from '../repository/user-repository-database';

export const makeCreateUserController = (database: MongoHelper): UserControllerAdapter => {
  const bcrypterHasher = new BcryptHasher(12);
  const userRepository = new UserRepositoryDatabase(database);
  const createUser = new CreateUser(userRepository, bcrypterHasher);
  return new UserControllerAdapter(createUser);
};
