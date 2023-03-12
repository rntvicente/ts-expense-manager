/* eslint-disable @typescript-eslint/ban-types */
export type httpMethod = 'post' | 'get' | 'put' | 'patch' | 'delete';

export interface HttpServer {
  listen(port: number): void;
  close(): void;
  on(method: httpMethod, url: string, callback: Function): void;
}
