import { IProduct } from '@back/domain';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class ProductSwaggerModel implements IProduct {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  code: string;
  @ApiProperty({ type: String }) name: string;
  @ApiProperty({ type: String }) description: string;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: Number })
  quantity: number;
  @ApiProperty({ type: String }) inventoryStatus: string;
  @ApiProperty({ type: String }) category: string;
  @ApiPropertyOptional({ type: String })
  image?: string;
  @ApiPropertyOptional({ type: Number })
  rating?: number;
}

export class UpdateProductSwaggerModel extends PartialType(
  ProductSwaggerModel,
) {}
