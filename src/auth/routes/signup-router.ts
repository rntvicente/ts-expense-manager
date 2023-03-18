import { Request } from 'express';

import { HttpServer } from '../../infra/server/http-server';
import { Controller } from '../../infra/controller/handle';

export class UserRoute {
  constructor(
    readonly httpServer: HttpServer,
    readonly controller: Controller
  ) {
    httpServer.on('post', '/signup', async function ({ body }: Request) {
      return await controller.handle({ body });
    });
  }
}
