import express, { Application } from 'express';

import { HttpServer } from './http-server';

export class ExpressAdapter implements HttpServer {
  private app: Application;
  private server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  async start(port: number): Promise<void> {
    this.server = this.app.listen(port);

    await new Promise<void>((resolve) =>
      this.server.on(
        `Server starting at ${this.server.address().address}, ${port}`,
        resolve
      )
    );
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve) => this.server.close(resolve));
    this.server = undefined;
  }
}
