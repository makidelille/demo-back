import { providers } from '@back/infrastructure';
import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';

@Module({
  controllers: [ProductsController],
  providers: providers,
})
export class AppModule {}
