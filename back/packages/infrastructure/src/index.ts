import { symbols } from "@back/domain";
import { container } from "tsyringe";
import { ProductMongoRepository } from "./repositories/mongo/productMongoRepository";

export function setup() {
    // Choisir le repo à setup
    container.register(symbols.productRepository, { useClass: ProductMongoRepository });
}

export { container };