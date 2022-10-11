/**
 * Product Service
 * @module Product Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from './product.repository';

export class ProductService {
  private static instance: ProductService;
  private productRepository: ProductRepository;

  constructor() {
    if (ProductService.instance) {
      return ProductService.instance;
    }

    this.productRepository = getCustomRepository(ProductRepository);
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
