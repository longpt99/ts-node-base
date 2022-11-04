/**
 * Order Service
 * @module Order Controller
 * @description Config controller
 */
import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ErrorHandler } from '../../libs/errors';
import { OrderItemAttribute } from '../order-item-attribute/order-item-attribute.entity';
import { OrderItemAttributeService } from '../order-item-attribute/order-item-attribute.service';
import { OrderItemService } from '../order-item/order-item.service';
import { ProductAttributeRepository } from '../products/product-attribute/product-attribute.repository';
import { ProductRepository } from '../products/product/product.repository';
import { CreateOrderParams } from './order.model';
import { OrderRepository } from './order.repository';

export class OrderService {
  private static instance: OrderService;
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;
  private productAttributeRepository: ProductAttributeRepository;
  private orderItemService: OrderItemService;
  private orderItemAttributeService: OrderItemAttributeService;

  constructor() {
    if (OrderService.instance) {
      return OrderService.instance;
    }

    this.orderItemService = new OrderItemService();
    this.orderItemAttributeService = new OrderItemAttributeService();
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
      const product = params.body.products[i];
      productIds.push(product.id);
      for (
        let j = 0, total = product.productAttributes.length;
        j < total;
        j++
      ) {
        productsMap.set(
          product.productAttributes[j].id,
          product.productAttributes[j]
        );
        attributeIds.push(product.productAttributes[j].id);
      }
    }
    return this.orderRepository.manager.transaction(async (manager) => {
      const orderParams: {
        price;
        discountPrice;
        quantity;
        orderItems;
        shippingAddress;
        user;
        fullName: string;
      } = {
        price: 0,
        discountPrice: 0,
        quantity: 0,
        orderItems: [],
        shippingAddress: params.body.shippingAddress,
        user: params.user.id,
        fullName: `${params.user.firstName} ${params.user.lastName}`,
      };
      const promiseAllCreateOrderItems: any = [];
      const promiseAllCreateOrderItemAttributes: any = [];
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
        for (const attribute of element.productAttributes) {
          const attributeMap = productsMap.get(attribute.id);
          const quantity = attributeMap.quantity;
          if (
            attribute.quantity &&
            (attribute.quantity === 0 || quantity > attribute.quantity)
          ) {
            throw new ErrorHandler({ message: 'productNotEnough' });
          }
          const price = +element.price + +attribute.price;
          promiseAllCreateOrderItemAttributes.push({
            quantity: quantity,
            price: price,
            productAttribute: attribute.id,
          });
        }
      }

      const orderItemAttributesCreated =
        await this.orderItemAttributeService.create({
          manager: manager,
          body: promiseAllCreateOrderItemAttributes,
        });

      for (let i = 0, total = products.length; i < total; i++) {
        const element = products[i];
        const orderItemAttributes: any = [];
        let totalQuantities = 0;
        let totalPrices = 0;
        for (const attribute of element.productAttributes) {
          const idx = orderItemAttributesCreated.findIndex(
            (item) => String(item.productAttribute) === attribute.id
          );
          orderItemAttributes.push(orderItemAttributesCreated[idx]);
          totalPrices +=
            orderItemAttributesCreated[idx].price *
            orderItemAttributesCreated[idx].quantity;
          totalQuantities += orderItemAttributesCreated[idx].quantity;
        }
        promiseAllCreateOrderItems.push({
          quantity: totalQuantities,
          price: totalPrices,
          name: element.name,
          orderItemAttributes: orderItemAttributes,
          product: element.id,
        });

        orderParams.quantity += totalQuantities;
        orderParams.price += totalPrices;
      }

      orderParams.orderItems = await this.orderItemService.create({
        body: promiseAllCreateOrderItems,
        manager: manager,
      });

      return manager.save(this.orderRepository.create(orderParams));
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
   * @method getById
   * @description Get detail by id
   */
  async getById() {
    return;
  }

  /**
   * @method updateById
   * @description Update by id
   */
  async updateById() {
    return;
  }

  /**
   * @method deleteById
   * @description Delete by id
   */
  async deleteById() {
    return;
  }
}
