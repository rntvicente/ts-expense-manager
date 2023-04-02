import { Collection } from 'mongodb';

export interface DatabaseHelper {
  connect(url: string): Promise<void>;
  close(): Promise<void>;
  getCollection(name: string): Promise<Collection>;
}
