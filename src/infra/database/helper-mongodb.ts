import { Collection, MongoClient } from 'mongodb';

import { DatabaseHelper } from './helper';

export class MongoHelper implements DatabaseHelper {
  private _client: MongoClient | undefined;
  private _url: string | undefined;

  async connect(url: string): Promise<void> {
    this._url = url;
    this._client = await MongoClient.connect(this._url);
  }

  async close(): Promise<void> {
    await this._client?.close();
  }

  async getCollection(name: string): Promise<Collection> {
    if (!this._client) this.connect(this._url);

    return this._client.db().collection(name);
  }
}
