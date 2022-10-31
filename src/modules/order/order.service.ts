/**
 * Order Service
 * @module Order Controller
 * @description Config controller
 */
import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ErrorHandler } from '../../libs/errors';
import { ProductAttributeRepository } from '../products/product-attribute/product-attribute.repository';
import { ProductRepository } from '../products/product/product.repository';
import { CreateOrderParams } from './order.model';
import { OrderRepository } from './order.repository';

export class OrderService {
  private static instance: OrderService;
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;
  private productAttributeRepository: ProductAttributeRepository;

  constructor() {
    if (OrderService.instance) {
      return OrderService.instance;
    }

    this.orderRepository = getCustomRepository(OrderRepository);
    this.productRepository = getCustomRepository(ProductRepository);
    this.productAttributeRepository = getCustomRepository(
      ProductAttributeRepository
    );
    OrderService.instance = this;
  }

  /**
   * @method create
   * @description Create new order
   */
  async create(params: { user: Express.TokenModel; body: CreateOrderParams }) {
    const attributeIds: string[] = [];
    const productIds: string[] = [];
    const productsMap = new Map<string, any>();
    for (let i = 0, total = params.body.products.length; i < total; i++) {
      productsMap.set(
        params.body.products[i].id,
        params.body.products[i].productAttributes
      );
      const element = params.body.products[i];
      productIds.push(element.id);
      for (
        let j = 0, total = element.productAttributes.length;
        j < total;
        j++
      ) {
        attributeIds.push(element.productAttributes[j].id);
      }
    }

    return this.orderRepository.manager.transaction(async (manager) => {
      const orderParams: any = {
        price: 0,
        discountPrice: 0,
        quantity: 0,
        orderItems: [],
        shippingAddress: params.body.shippingAddress,
        user: params.user.id,
      };
      const products = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.productAttributes', 'attribute')
        .select()
        .addSelect('attribute.id')
        .addSelect('attribute.quantity')
        .addSelect('attribute.price')
        .where('product.id IN (:...productIds)', { productIds: productIds })
        .andWhere(
          '(product.status = :activeStatus AND attribute.status = :activeStatus)',
          { activeStatus: AppObject.COMMON_STATUS.ACTIVE }
        )
        .andWhere('attribute.id IN (:...attributeIds)', {
          attributeIds: attributeIds,
        })
        .getMany();

      if (products.length !== params.body.products.length) {
        throw new ErrorHandler({ message: 'productNotFound' });
      }

      for (let i = 0, total = products.length; i < total; i++) {
        const element = products[i];
        const attributesMap = productsMap.get(element.id);
        const orderItemAttributes: any = [];
        let totalQuantities = 0;
        let totalPrices = 0;
        for (const attribute of attributesMap) {
          const attributeIdx = element.productAttributes.findIndex(
            (item) => item.id === attribute.id
          );
          const quantity = element.productAttributes[attributeIdx].quantity;
          if (quantity && (quantity === 0 || attribute.quantity > quantity)) {
            throw new ErrorHandler({ message: 'productNotEnough' });
          }
          const price =
            +element.price + +element.productAttributes[attributeIdx].price;
          orderItemAttributes.push({
            quantity: attribute.quantity,
            productAttribute: element.productAttributes[attributeIdx].id,
            price: price,
          });
          totalPrices += price * attribute.quantity;
          totalQuantities += attribute.quantity;
        }

        orderParams.orderItems.push({
          quantity: totalQuantities,
          price: totalPrices,
          name: element.name,
          orderItemAttributes: orderItemAttributes,
        });
        orderParams.quantity += totalQuantities;
        orderParams.price += totalPrices;
      }

      return orderParams;
    });
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
