import { MongoHelper } from './infra/database/helper-mongodb';
import { ExpressAdapter } from './infra/server/express-adapter';
import { UserRoute } from './infra/routes/user-router';
import { UserControllerAdapter } from './infra/controller/user-controller-adapter';
import { UserRepositoryDatabase } from './infra/repository/user-repository-database';
import { BcryptHasher } from './infra/encrypter/bcrypt-hasher';

import { CreateUser } from './application/use-cases/create-user';

const database = new MongoHelper();
const app = new ExpressAdapter();

const bcrypterHasher = new BcryptHasher(12);
const userRepository = new UserRepositoryDatabase(database);
const createUser = new CreateUser(userRepository, bcrypterHasher);
const userControllerAdapter = new UserControllerAdapter(createUser);

database
  .connect('mongodb://localhost:27017/ExpensesManager')
  .then(() => {
    console.info('Database connected.');

    new UserRoute(app, userControllerAdapter);
    app.listen(3000);
  })
  .catch((error) => {
    console.error(`Fails start database ${error}`);
  });
