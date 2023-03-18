import { NextFunction, Request, Response } from 'express';

import { HttpServer } from '../../infra/server/http-server';
import { Controller } from '../../infra/controller/handle';

export class LoginRoute {
  constructor(
    readonly httpServer: HttpServer,
    readonly controller: Controller
  ) {
    httpServer.on(
      'post',
      '/login',
      async function ({ body }: Request, res: Response, next: NextFunction) {
        return await controller.handle({ body });
        next();
      }
    );
  }
}
