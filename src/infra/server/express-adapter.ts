import express, { Application, Request, Response } from 'express';

import { httpMethod, HttpServer } from './http-server';

export class ExpressAdapter implements HttpServer {
  private app: Application;
  private server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  on(method: httpMethod, url: string, callback: Function): void {
    this.app[method](url, async function (req: Request, res: Response) {
      try {
        const { statusCode, body } = await callback(req, res);
        return res.status(statusCode).json(body);
      } catch (error) {
        res.status(422).json({ message: error.message });
      }
    });
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
