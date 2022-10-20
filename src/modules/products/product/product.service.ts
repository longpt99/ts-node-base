/**
 * Product Service
 * @module Product Controller
 * @description Config controller
 */
import { getCustomRepository, Not } from 'typeorm';
import { AppObject } from '../../../common/consts';
import { ParamsCommonGetDetail } from '../../../common/interfaces';
import { ErrorHandler } from '../../../libs/errors';
import { ProductAttributeService } from '../product-attribute/product-attribute.service';
import { CreateProductParams, ProductModel } from './product.model';
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

  async detailByConditions(params: ParamsCommonGetDetail<ProductModel>) {
    return this.productRepository.detailByConditions(params);
  }

  /**
   * @method create
   * @description Create new product
   */
  async create(params: CreateProductParams) {
    return this.productRepository.manager.transaction(async (manager) => {
      try {
        params.productAttributes = await this.productAttributeService.create(
          params.productAttributes,
          manager
        );
        const productCreated = await manager.save(
          this.productRepository.create(params)
        );
        return productCreated;
      } catch (error) {
        if (error.code === AppObject.ERR_CODE_DB.UNIQUE) {
          throw new ErrorHandler({ message: 'productExists' });
        }
        throw error;
      }
    });
  }

  /**
   * @method list
   * @description Get list
   */
  async list(params) {
    const alias = 'product';
    const queryBuilder = this.productRepository
      .createQueryBuilder(alias)
      .select();

    if (params.search) {
      queryBuilder.andWhere(`(${alias}.name ILIKE :name)`, {
        name: `%${params.search}%`,
      });
    }

    if (params.status) {
      queryBuilder.andWhere(`(${alias}.status = :status)`, {
        status: params.status,
      });
    }

    return this.productRepository.list({
      conditions: queryBuilder,
      paginate: params,
      alias: alias,
    });
  }

  /**
   * @method list
   * @description Get list
   */
  async publicList(params) {
    const alias = 'product';
    const queryBuilder = this.productRepository
      .createQueryBuilder(alias)
      .select();

    if (params.search) {
      queryBuilder.andWhere(`(${alias}.name ILIKE :name)`, {
        name: `%${params.search}%`,
      });
    }

    if (params.status) {
      queryBuilder.andWhere(`(${alias}.status = :status)`, {
        status: params.status,
      });
    }

    queryBuilder.andWhere(`(${alias}.status <> :notStatus)`, {
      notStatus: AppObject.PRODUCT_STATUS.INACTIVE,
    });

    return this.productRepository.list({
      conditions: queryBuilder,
      paginate: params,
      alias: alias,
    });
  }

  /**
   * @async
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById(id: string) {
    return this.detailByConditions({ conditions: { id: id } });
  }

  /**
   * @async
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async publicDetail(id: string) {
    return this.detailByConditions({
      conditions: {
        id: id,
        status: Not(AppObject.COMMON_STATUS.INACTIVE) as any,
      },
    });
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
  async deleteById(id: string) {
    await this.productRepository.updateByConditions({
      conditions: { id: id },
      data: { isDeleted: true },
    });
    return { success: true };
  }
}
