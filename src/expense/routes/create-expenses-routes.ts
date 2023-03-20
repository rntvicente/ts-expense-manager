import { Request } from 'express';

import { HttpServer } from '../../infra/server/http-server';
import { Controller } from '../../infra/controller/handle';

export class CreateExpenseRoute {
  constructor(
    readonly httpServer: HttpServer,
    readonly controller: Controller
  ) {
    httpServer.on('post', '/expenses', async function ({ body }: Request) {
      return await controller.handle({ body });
    });
  }
}
