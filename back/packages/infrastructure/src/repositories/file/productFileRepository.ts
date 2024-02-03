import { IProduct, IProductRepository } from '@back/domain';
import { BaseFileRepository } from './baseFileRepository';

export class ProductFileRepository
  extends BaseFileRepository<IProduct>
  implements IProductRepository
{
  constructor() {
    super('products');
  }
}
