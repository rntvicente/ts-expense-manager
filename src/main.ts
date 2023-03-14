import * as dotenv from 'dotenv';

import { MongoHelper } from './infra/database/helper-mongodb';
import { ExpressAdapter } from './infra/server/express-adapter';
import { UserRoute } from './infra/routes/user-router';
import { makeCreateUserController } from './infra/factories/user';

const database = new MongoHelper();
const app = new ExpressAdapter();

dotenv.config();

database
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.info('Database connected.');

    new UserRoute(app, makeCreateUserController(database));
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.error(`Fails start database ${error}`);
  });
