import { IProduct, IUpdateProduct, ProductService } from '@back/domain';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProductViewModel } from './models/ProductViewModel';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get('')
  public async listProducts() {
    const products = await this.productService.getAll();
    return products.map(ProductViewModel.fromEntity);
  }

  @Post('')
  @HttpCode(201)
  public async createProduct(@Body() body: IProduct) {
    await this.productService.createOne(body);
  }

  @Get(':id')
  public async getProduct(@Param(':id') id: number) {
    const product = await this.productService.getOneById(id);
    return ProductViewModel.fromEntity(product);
  }

  @Patch(':id')
  public async updateProduct(
    @Param(':id') id: number,
    @Body() body: IUpdateProduct,
  ) {
    await this.productService.updateOne(id, body);
  }

  @Delete(':id')
  public async deleteProduct(@Param(':id') id: number) {
    await this.productService.deleteOne(id);
  }
}
