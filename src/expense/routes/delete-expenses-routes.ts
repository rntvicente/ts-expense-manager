import { Request } from 'express';

import { HttpServer } from '../../infra/server/http-server';
import { Controller } from '../../infra/controller/handle';

export class DeleteExpenseRoute {
  constructor(
    readonly httpServer: HttpServer,
    readonly controller: Controller
  ) {
    httpServer.on('delete', '/expenses/:expenseId', async function ({ body, params }: Request) {
      return await controller.handle({ body, params });
    });
  }
}
