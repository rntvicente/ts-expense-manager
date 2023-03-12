/* eslint-disable @typescript-eslint/ban-types */
export interface HttpServer {
  on(method: string, url: string, callback: Function): void;
  listen(port: number): void;
  close(): void;
}
