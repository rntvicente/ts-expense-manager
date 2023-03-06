export interface DatabaseHelper {
  connect(url: string): Promise<void>;
  close(): Promise<void>;
}
