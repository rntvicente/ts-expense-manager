import express, { Application, Request, Response } from 'express';

import { HttpServer } from './http-server';

export class ExpressAdapter implements HttpServer {
  private app: Application;
  private server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  on(method: string, url: string, callback: Function): void {
    this.app[method](
      url,
      async function (request: Request, response: Response) {
        try {
          const output = await callback(request.params, request.body);
          response.json(output);
        } catch (e: any) {
          response.status(422).json({
            message: e.message
          });
        }
      }
    );
  }

  close(): void {
    this.server.close();
  }

  listen(port: number): void {
    this.server = this.app.listen(port);
    console.info(`Server starting at ${port}`);
  }

  getApp() {
    return this.app;
  }
}
