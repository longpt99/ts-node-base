/**
 * OrderItem Service
 * @module OrderItem Controller
 * @description Config controller
 */

import { EntityManager, getCustomRepository } from 'typeorm';
import { OrderItemRepository } from './order-item.repository';

export class OrderItemService {
  private static instance: OrderItemService;
  private orderItemRepository: OrderItemRepository;

  constructor() {
    if (OrderItemService.instance) {
      return OrderItemService.instance;
    }

    this.orderItemRepository = getCustomRepository(OrderItemRepository);
    OrderItemService.instance = this;
  }

  /**
   * @method create
   * @description Create new order-item
   */
  async create(params: { manager: EntityManager; body }) {
    return params.manager.save(this.orderItemRepository.create(params.body));
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
