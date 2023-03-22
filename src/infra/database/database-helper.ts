import { Collection } from 'mongodb';
import { Model } from './model';

export interface DatabaseHelper {
  connect(url: string): Promise<void>;
  close(): Promise<void>;
  getCollection<m extends Model>(name: string): Promise<Collection<m>>;
}
