/**
 * ProductAttribute Service
 * @module ProductAttribute Controller
 * @description Config controller
 */

import { EntityManager, getCustomRepository } from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';
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
  async create(params: CreateProductAttributeParams[], manager: EntityManager) {
    return manager.save(this.productAttributeRepository.create(params));
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

    await params.manager.update(
      ProductAttribute,
      { product: params.productId, isDeleted: false },
      { isDeleted: true, onwerId: params.productId }
    );

    return params.attributes;
  }

  /**
   * @method deleteByProductId
   * @description Delete by id
   */
  async deleteByProductId(params: {
    productId: string;
    manager: EntityManager;
  }) {
    // await params.manager
    //   .createQueryBuilder()
    //   .from(ProductAttribute, 'attribute')
    //   .update({
    //     isDeleted: true,
    //   })
    //   .where('product = :productId', {
    //     productId: params.productId,
    //   })
    //   .execute();
    return params.manager.update(
      ProductAttribute,
      { product: params.productId, isDeleted: false },
      { isDeleted: true }
    );
  }
}
