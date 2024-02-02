import { IRepository } from "../../shared/interfaces/repository";
import { Product } from "../entity/product";

export interface IProductRepository extends IRepository<Product> {}