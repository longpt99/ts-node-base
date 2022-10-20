/**
 * OrderItemDetail Service
 * @module OrderItemDetail Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';

import { ErrorHandler, UnauthorizedError } from '../../libs/errors';
import StatusCodes from '../../utils/status-code';
import { OrderItemDetailModel } from './order-item-detail.model';
import { OrderItemDetailRepository } from './order-item-detail.repository';

export class OrderItemDetailService {
  private static instance: OrderItemDetailService;
  private orderItemDetailRepository: OrderItemDetailRepository;

  constructor() {
    if (OrderItemDetailService.instance) {
      return OrderItemDetailService.instance;
    }

    this.orderItemDetailRepository = getCustomRepository(
      OrderItemDetailRepository
    );
    OrderItemDetailService.instance = this;
  }

  /**
   * @method create
   * @description Create new order-item-detail
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
