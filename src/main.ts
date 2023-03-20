import * as dotenv from 'dotenv';

import { MongoHelper } from './infra/database/helper-mongodb';
import { makeSignInController } from './infra/factories/signin-factory';
import { makeLoginController } from './infra/factories/login-factory';
import { makeCreateExpenseController } from './infra/factories/create-expenses-factory';

import { ExpressAdapter } from './infra/server/express-adapter';
import { UserRoute } from './auth/routes/signup-router';
import { LoginRoute } from './auth/routes/login-router';
import { CreateExpenseRoute } from './expense/routes/create-expenses-routes';

const database = new MongoHelper();
const app = new ExpressAdapter();

dotenv.config();

database
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.info('Database connected.');

    new UserRoute(app, makeSignInController(database));
    new LoginRoute(app, makeLoginController(database));
    new CreateExpenseRoute(app, makeCreateExpenseController(database));

    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.error(`Fails start database ${error}`);
  });
