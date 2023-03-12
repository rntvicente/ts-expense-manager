import { HttpServer } from '../server/http-server';
import { UserController } from '../../application/constroller/user-constroller';

export class UserRoute {
  constructor(
    readonly httpServer: HttpServer,
    readonly userController: UserController
  ) {
    httpServer.on('post', '/users', async function (params, body) {
      const output = await userController.create(body);
      return output;
    });
  }
}
