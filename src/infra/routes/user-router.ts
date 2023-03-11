import { HttpServer } from '../server/http-server';
import { CreateUser } from '../../application/use-cases/create-user';

export class UserRoute {
  constructor(
    readonly httpServer: HttpServer,
    readonly createUser: CreateUser
  ) {
    httpServer.on('post', '/users', async function (params, body) {
      const output = await createUser.execute(body);
      return output;
    });
  }
}
