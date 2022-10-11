/**
 * ProductAttribute Service
 * @module ProductAttribute Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';

import { ProductAttributeRepository } from './product-attribute.repository';

export class ProductAttributeService {
  private static instance: ProductAttributeService;
  private productAttributeRepository: ProductAttributeRepository;

  constructor() {
    if (ProductAttributeService.instance) {
      return ProductAttributeService.instance;
    }

    this.productAttributeRepository = getCustomRepository(
      ProductAttributeRepository
    );
    ProductAttributeService.instance = this;
  }

  /**
   * @method create
   * @description Create new product-attribute
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
