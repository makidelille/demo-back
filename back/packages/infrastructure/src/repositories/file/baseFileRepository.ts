import { IRepository } from '@back/domain';
import { readFile, writeFile } from 'node:fs/promises';

export abstract class BaseFileRepository<T> implements IRepository<T> {
  private readonly filepath: string;

  constructor(private readonly collectionName: string) {
    this.filepath = process.env.DB_PATH!;
  }

  private get collection(): Promise<Record<string, T>> {
    return this.read().then((db) => db[this.collectionName] ?? {});
  }

  private async read(): Promise<Record<string, Record<string, T>>> {
    const fileString = await readFile(this.filepath, { encoding: 'utf-8' });
    try {
      return JSON.parse(fileString);
    } catch (err) {
      return {};
    }
  }

  private async write(collection: Record<string, T>) {
    const db = await this.read();
    db[this.collectionName] = collection;

    await writeFile(this.filepath, JSON.stringify(db), { encoding: 'utf-8' });
  }

  async findMany(): Promise<T[]> {
    return Object.values(await this.collection);
  }
  async findOne(id: number): Promise<T | null> {
    const db = await this.collection;
    return db[id];
  }
  async saveOne(id: number, props: T): Promise<void> {
    const db = await this.collection;
    db[id] = props;
    await this.write(db);
  }
  async deleteOne(id: number): Promise<void> {
    const db = await this.collection;
    delete db[id];
    await this.write(db);
  }
}
