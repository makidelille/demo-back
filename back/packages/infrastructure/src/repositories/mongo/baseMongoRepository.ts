import { IRepository } from '@back/domain';
import { MongoClient } from 'mongodb';

export abstract class BaseMongoRepository<T> implements IRepository<T> {
  private client: MongoClient;
  constructor(private readonly collectionName: string) {
    this.client = new MongoClient(process.env.MONGODB_URI!);
    this.client.connect();
  }
  protected get collection() {
    return this.client.db().collection<any>(this.collectionName);
  }

  findMany(filter: any): Promise<T[]> {
    return this.collection.find(filter, { projection: { _id: 0 } }).toArray();
  }
  findOne(id: number): Promise<T | null> {
    return this.collection.findOne<T>({ id }, { projection: { _id: 0 } });
  }
  async saveOne(id: number, props: T): Promise<void> {
    await this.collection.updateOne({ id }, { $set: props }, { upsert: true });
  }
  async deleteOne(id: number): Promise<void> {
    await this.collection.deleteOne({ id });
  }
}
