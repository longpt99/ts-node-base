/**
 * Order Service
 * @module Order Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';

import { ErrorHandler, UnauthorizedError } from '../../libs/errors';
import StatusCodes from '../../utils/status-code';
import { OrderModel } from './order.model';
import { OrderRepository } from './order.repository';

export class OrderService {
  private static instance: OrderService;
  private orderRepository: OrderRepository;

  constructor() {
    if (OrderService.instance) {
      return OrderService.instance;
    }

    this.orderRepository = getCustomRepository(OrderRepository);
    OrderService.instance = this;
  }

  /**
   * @method create
   * @description Create new order
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
