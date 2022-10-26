/**
 * OrderItemAttribute Service
 * @module OrderItemAttribute Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';
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
