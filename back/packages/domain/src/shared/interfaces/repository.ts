import { Entity } from "../entities/entity";

export interface IRepository<T extends Entity<U>, U = any> {
    findMany(filter: Object): Promise<T[]>;
    findOne(id: number): Promise<T | null>;
    saveOne(entity: T): Promise<void>;
    deleteOne(id: number): Promise<void>;
}