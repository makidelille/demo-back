import { Product } from '@back/domain';

export class ProductViewModel {
  static fromEntity(entity: Product) {
    return new ProductViewModel(entity);
  }

  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  inventoryStatus: string;
  category: string;
  image?: string;
  rating?: number;

  constructor(product: Product) {
    this.id = product.id;
    this.code = product.code;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.inventoryStatus = product.inventoryStatus;
    this.category = product.category;
    this.image = product.image;
    this.rating = product.rating;
  }
}
