import { symbols } from "../../shared/symbols";
import { Product } from "../entity/product";
import { IProduct, IUpdateProduct, productSchema, updateProductSchema } from "../interfaces/product";
import { IProductRepository } from "../interfaces/productRepository";
import type {DependencyContainer} from "tsyringe"

export class ProductService {
    private readonly productRepository: IProductRepository;

    constructor(dependencyContainer: DependencyContainer) {
        this.productRepository = dependencyContainer.resolve(symbols.productRepository);
    }


    getAll(query: any = {}){
        return this.productRepository.findMany(query);
    }

    async getOneById(id: number) {
        const product = await this.productRepository.findOne(id);
        if(product == null) throw new Error("Could not find product");
        return product;
    }

    async updateOne(id: number, input: IUpdateProduct) {
        const newProperties = updateProductSchema.parse(input);
        const product = await this.getOneById(id);

        product.update(newProperties);
        await this.productRepository.saveOne(product);
    }

    async deleteOne(id: number) {
        const product = await this.getOneById(id);
        await this.productRepository.deleteOne(product.id);
    }

    async createOne(input: IProduct){
        const productDTO = productSchema.parse(input);
        const product = new Product(productDTO);

        return this.productRepository.saveOne(product);
    }
    
}