/**
 * ProductAttribute Service
 * @module ProductAttribute Controller
 * @description Config controller
 */

import { EntityManager, getCustomRepository } from 'typeorm';
import {
  CreateProductAttributeParams,
  UpdateProductAttributeParams,
} from './product-attribute.model';

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
  async create(
    params: CreateProductAttributeParams[],
    transactionManager: EntityManager
  ) {
    return transactionManager.save(
      this.productAttributeRepository.create(params)
    );
  }

  /**
   * @method updateByProductId
   * @description Update by id
   */
  async updateByProductId(params: {
    productId: string;
    attributes: UpdateProductAttributeParams[];
    manager: EntityManager;
  }) {
    const attributeIds = params.attributes.map((item) => item.id);

    await this.productAttributeRepository
      .createQueryBuilder()
      .update({
        isDeleted: true,
        onwerId: params.productId,
      })
      .where('product = :productId', {
        productId: params.productId,
      })
      .andWhere('isDeleted IS FALSE')
      .execute();

    return params.attributes;
  }
}
