import { IRepository } from "../../shared/interfaces/repository";
import { IProduct } from "./product";

export interface IProductRepository extends IRepository<IProduct> {}