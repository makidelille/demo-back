import { Product, ProductService } from '@back/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductViewModel } from './models/ProductViewModel';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockProductService: ProductService;

  beforeEach(async () => {
    mockProductService = {
      getAll: jest.fn().mockResolvedValue([new Product({} as any)]),
      getOneById: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      createOne: jest.fn(),
    } as any as ProductService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAll', async () => {
    const result = await controller.listProducts();
    expect(mockProductService.getAll).toHaveBeenCalled();
    expect(result[0]).toBeInstanceOf(ProductViewModel);
  });
});
