import { NotFoundDomainError, ValidationDomainError } from 'domain/index';
import { IProductRepository } from 'domain/products/interfaces/productRepository';
import { ProductService } from 'domain/products/services/productService';
import { symbols } from 'domain/shared/symbols';
import 'reflect-metadata';
import { container } from 'tsyringe';

describe('productService', () => {
  let productService: ProductService;
  let productRepository: IProductRepository;

  beforeEach(() => {
    productRepository = {
      deleteOne: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
      findOne: jest
        .fn()
        .mockImplementation((value) => (value === 1234 ? { id: 1234 } : null)),
      saveOne: jest.fn(),
    };

    container.reset();
    container.register(symbols.productRepository, {
      useValue: productRepository,
    });

    productService = new ProductService(container);
  });

  describe('getters', () => {
    it('should call findMany', async () => {
      await productService.getAll();
      expect(productRepository.findMany).toHaveBeenCalledWith({});
    });

    it('should call findOne', async () => {
      const product = await productService.getOneById(1234);
      expect(productRepository.findOne).toHaveBeenCalledWith(1234);
      expect(product).toBeDefined();
    });

    it('should throw if not found', async () => {
      await expect(productService.getOneById(512)).rejects.toThrow(
        NotFoundDomainError,
      );
    });
  });

  describe('setters', () => {
    it('should create a new product', async () => {
      const newProduct = {
        id: 12,
        code: 'string',
        name: 'string',
        description: 'string',
        price: 1324,
        quantity: 0,
        inventoryStatus: 'string',
        category: 'categ',
      };
      await productService.createOne(newProduct);

      expect(productRepository.saveOne).toHaveBeenCalledWith(
        12,
        expect.objectContaining(newProduct),
      );
    });

    it('should not create a new product if invalid', async () => {
      const newProduct = {};
      await expect(productService.createOne(newProduct as any)).rejects.toThrow(
        ValidationDomainError,
      );
    });

    it('should update an existing product', async () => {
      const spy = jest.spyOn(productService, 'getOneById');
      const newProps = {
        name: 'newname',
      };

      await productService.updateOne(1234, newProps);

      expect(spy).toHaveBeenCalledWith(1234);
      expect(productRepository.saveOne).toHaveBeenCalledWith(
        1234,
        expect.objectContaining(newProps),
      );
    });

    it('should not update if not existing properties', async () => {
      const newProps = {
        invalid: 'invalid property',
      };

      await expect(
        productService.updateOne(1234, newProps as any),
      ).rejects.toThrow(ValidationDomainError);
    });

    it('Shoulde delete an existing product', async () => {
      const spy = jest.spyOn(productService, 'getOneById');
      await productService.deleteOne(1234);

      expect(spy).toHaveBeenCalledWith(1234);
      expect(productRepository.deleteOne).toHaveBeenCalledWith(1234);
    });
  });
});
