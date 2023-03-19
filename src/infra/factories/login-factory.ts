import { MongoHelper } from '../../infra/database/helper-mongodb';

import { UserRepositoryDatabase } from '../../auth/repository/user-repository-database';
import { Login } from '../../auth/application/use-cases/login';
import { LoginInControllerAdapter } from '../../auth/controller/login-controller-adapter';

export const makeLoginController = (
  database: MongoHelper
): LoginInControllerAdapter => {
  const repository = new UserRepositoryDatabase(database);
  const useCase = new Login(repository);
  return new LoginInControllerAdapter(useCase);
};
