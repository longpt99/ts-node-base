/**
 * Product Service
 * @module Product Controller
 * @description Config controller
 */
import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../../common/consts';
import { ParamsCommonGetDetail } from '../../../common/interfaces';
import { ErrorHandler } from '../../../libs/errors';
import { ProductAttributeService } from '../product-attribute/product-attribute.service';
import {
  CreateProductParams,
  ProductModel,
  UpdateProductParams,
} from './product.model';
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

  //#region Admin Section\
  /**
   * @async
   * @method getByIdByAdmin
   * @description Get detail by id
   * @param params {id}
   */
  async getByIdByAdmin(id: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productAttributes', 'productAttribute')
      .where('product.id = :productId', { productId: id })
      .andWhere('productAttribute.isDeleted IS FALSE')
      .getOne();
    return product;
  }
  //#endregion Admin Section

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
   * @method getById
   * @description Get detail by id
   */
  async getById(id: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productAttributes', 'productAttribute')
      .where('product.id = :productId', { productId: id })
      .andWhere('product.status <> :notStatus', {
        notStatus: AppObject.COMMON_STATUS.INACTIVE,
      })
      .andWhere('productAttribute.isDeleted IS FALSE')
      .getOne();

    if (!product) {
      throw new ErrorHandler({ message: 'productNotFound' });
    }

    return product;
  }

  /**
   * @method updateById
   * @description Update by id
   */
  async updateById(params: { id: string; body: UpdateProductParams }) {
    return this.productRepository.manager.transaction(async (manager) => {
      try {
        const product = await this.detailByConditions({
          conditions: { id: params.id },
        });

        if (!product) {
          throw new ErrorHandler({ message: 'productNotFound' });
        }

        if (params.body.productAttributes) {
          this.productAttributeService.updateByProductId({
            productId: params.id,
            attributes: params.body.productAttributes,
            manager: manager,
          });
        }

        Object.assign(product, params.body);
        const productUpdated = await manager.save(product);
        return productUpdated;
      } catch (error) {
        if (error.code === AppObject.ERR_CODE_DB.UNIQUE) {
          throw new ErrorHandler({ message: 'productExists' });
        }
        throw error;
      }
    });
  }

  /**
   * @async
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(id: string) {
    return this.productRepository.manager.transaction(async (manager) => {
      const [product] = await Promise.all([
        this.detailByConditions({
          conditions: { id: id, isDeleted: false },
          select: ['id'],
        }),
        this.productAttributeService.deleteByProductId({
          productId: id,
          manager: manager,
        }),
      ]);

      if (!product) {
        throw new ErrorHandler({ message: 'productNotFound' });
      }
      product.isDeleted = true;
      await manager.save(product);
      return { success: true };
    });
  }
}
