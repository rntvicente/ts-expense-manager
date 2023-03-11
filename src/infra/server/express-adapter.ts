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

  async listen(port: number): Promise<void> {
    this.server = this.app.listen(port);

    await new Promise<void>((resolve) =>
      this.server.on(
        `Server starting at ${this.server.address().address}, ${port}`,
        resolve
      )
    );
  }
}