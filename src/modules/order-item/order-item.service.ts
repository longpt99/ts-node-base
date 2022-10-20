/**
 * OrderItem Service
 * @module OrderItem Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';

import { ErrorHandler, UnauthorizedError } from '../../libs/errors';
import StatusCodes from '../../utils/status-code';
import { OrderItemModel } from './order-item.model';
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
