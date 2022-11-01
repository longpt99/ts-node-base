/**
 * OrderItemAttribute Service
 * @module OrderItemAttribute Controller
 * @description Config controller
 */

import { EntityManager, getCustomRepository } from 'typeorm';
import { OrderItemAttribute } from './order-item-attribute.entity';
import { OrderItemAttributeRepository } from './order-item-attribute.repository';

export class OrderItemAttributeService {
  private static instance: OrderItemAttributeService;
  private orderItemAttributeRepository: OrderItemAttributeRepository;

  constructor() {
    if (OrderItemAttributeService.instance) {
      return OrderItemAttributeService.instance;
    }

    this.orderItemAttributeRepository = getCustomRepository(
      OrderItemAttributeRepository
    );
    OrderItemAttributeService.instance = this;
  }

  /**
   * @method create
   * @description Create new order-item-attribute
   */
  async create(params: {
    manager: EntityManager;
    body;
  }): Promise<OrderItemAttribute[]> {
    return params.manager.save(
      this.orderItemAttributeRepository.create(params.body)
    );
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
