import { Entity } from "../entities/entity";

export interface IRepository<U> {
    findMany(filter: Object): Promise<U[]>;
    findOne(id: number): Promise<U | null>;
    saveOne(id: number, entity: U): Promise<void>;
    deleteOne(id: number): Promise<void>;
}