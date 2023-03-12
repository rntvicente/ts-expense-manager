import { MongoHelper } from './infra/database/helper-mongodb';
import { ExpressAdapter } from './infra/server/express-adapter';
import { UserRoute } from './infra/routes/user-router';
import { makeCreateUserController } from './infra/factories/user';

const database = new MongoHelper();
const app = new ExpressAdapter();

database
  .connect('mongodb://localhost:27017/ExpensesManager')
  .then(() => {
    console.info('Database connected.');

    new UserRoute(app, makeCreateUserController());
    app.listen(3000);
  })
  .catch((error) => {
    console.error(`Fails start database ${error}`);
  });
