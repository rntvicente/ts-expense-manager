export interface HttpServer {
  start(port: number): Promise<void>;
  stop(): Promise<void>;
}
