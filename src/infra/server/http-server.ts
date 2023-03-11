export interface HttpServer {
  on (method: string, url: string, callback: Function): void;
  listen (port: number): Promise<void>;
}
