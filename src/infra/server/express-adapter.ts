import express, { Application, Request, Response } from 'express';

import { httpMethod, HttpServer } from './http-server';

export class ExpressAdapter implements HttpServer {
  private _app: Application;
  private _server;

  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  on(method: httpMethod, url: string, callback: Function): void {
    this._app[method](url, async function (req: Request, res: Response) {
      try {
        const { statusCode, body } = await callback(req, res);
        return res.status(statusCode).json(body);
      } catch (error) {
        res.status(422).json({ message: error.message });
      }
    });
  }

  close(): void {
    this._server.close();
  }

  listen(port: number): void {
    this._server = this._app.listen(port);
    console.info(`Server starting at ${port}`);
  }

  getApp() {
    return this._app;
  }
}
