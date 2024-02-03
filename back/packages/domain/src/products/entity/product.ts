import { Entity } from '../../shared/entities/entity';
import { IProduct } from '../interfaces/product';

export class Product extends Entity<IProduct> {
  static fromDTO(props: IProduct) {
    return new Product(props);
  }

  public get id() {
    return this.props.id;
  }

  public get code() {
    return this.props.code;
  }
  public set code(value: string) {
    this.props.code = value;
  }

  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }
  get price() {
    return this.props.price;
  }
  get quantity() {
    return this.props.quantity;
  }
  get inventoryStatus() {
    return this.props.inventoryStatus;
  }
  get category() {
    return this.props.category;
  }
  get image() {
    return this.props.image;
  }
  get rating() {
    return this.props.rating;
  }

  constructor(props: IProduct) {
    super(props);
  }

  update(newProperties: Partial<IProduct>) {
    for (const key in newProperties) {
      (this.props as any)[key] = newProperties[key as keyof IProduct];
    }
  }
}
