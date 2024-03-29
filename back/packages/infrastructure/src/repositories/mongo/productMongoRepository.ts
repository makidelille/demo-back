import { IProduct, IProductRepository } from '@back/domain';
import { BaseMongoRepository } from './baseMongoRepository';

export class ProductMongoRepository
  extends BaseMongoRepository<IProduct>
  implements IProductRepository
{
  constructor() {
    super('products');
  }
}
