/**
 * Product Service
 * @module Product Controller
 * @description Config controller
 */

import { getConnection, getCustomRepository } from 'typeorm';
import { ErrorHandler } from '../../../libs/errors';
import { ProductAttributeService } from '../product-attribute/product-attribute.service';
import { CreateProductParams } from './product.model';
import { ProductRepository } from './product.repository';

export class ProductService {
  private static instance: ProductService;
  private productRepository: ProductRepository;
  private productAttributeService: ProductAttributeService;

  constructor() {
    if (ProductService.instance) {
      return ProductService.instance;
    }

    this.productRepository = getCustomRepository(ProductRepository);
    this.productAttributeService = new ProductAttributeService();

    ProductService.instance = this;
  }

  /**
   * @method create
   * @description Create new product
   */
  async create(params: CreateProductParams) {
    return this.productRepository.manager.transaction(async (manager) => {
      console.time('productAttributeCreated');
      params.productAttributes = await this.productAttributeService.create(
        params.productAttributes,
        manager
      );
      console.timeEnd('productAttributeCreated');
      return manager.save(this.productRepository.create(params));
    });
  }

  /**
   * @method list
   * @description Get list
   */
  async list(params) {
    return;
  }

  /**
   * @async
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById() {
    return;
  }

  /**
   * @async
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById() {
    return;
  }

  /**
   * @async
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById() {
    return;
  }
}
