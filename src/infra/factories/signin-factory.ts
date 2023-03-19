import { SignIn } from '../../auth/application/use-cases/signup';

import { MongoHelper } from '../database/helper-mongodb';
import { SignInControllerAdapter } from '../../auth/controller/signin-controller-adapter';
import { UserRepositoryDatabase } from '../../auth/repository/user-repository-database';

export const makeSignInController = (
  database: MongoHelper
): SignInControllerAdapter => {
  const userRepository = new UserRepositoryDatabase(database);
  const signIn = new SignIn(userRepository);
  return new SignInControllerAdapter(signIn);
};
