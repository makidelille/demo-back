import { ProductService, symbols } from '@back/domain';
import { container } from 'tsyringe';
import { ProductFileRepository } from './repositories/file/productFileRepository';
import { ProductMongoRepository } from './repositories/mongo/productMongoRepository';

export function setup() {
  // Choisir le repo à setup
  if (process.env.MONGODB_URI) {
    container.register(symbols.productRepository, {
      useClass: ProductMongoRepository,
    });
  }

  if (process.env.DB_PATH) {
    container.register(symbols.productRepository, {
      useClass: ProductFileRepository,
    });
  }

  container.register(ProductService, {
    useFactory: (di) => new ProductService(di),
  });
}

export const providers = [
  {
    provide: ProductService,
    useFactory: () => container.resolve(ProductService),
  },
];

export { container };
