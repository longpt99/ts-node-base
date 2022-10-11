/**
 * Product Service
 * @module Product Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';
import { ProductAttributeService } from '../product-attribute/product-attribute.service';
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
  async create() {
    return;
  }

  /**
   * @method list
   * @description Get list
   */
  async list() {
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
