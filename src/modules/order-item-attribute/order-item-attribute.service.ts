/**
 * OrderItemAttribute Service
 * @module OrderItemAttribute Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';

import { ErrorHandler, UnauthorizedError } from '../../libs/errors';
import StatusCodes from '../../utils/status-code';
import { OrderItemAttributeModel } from './order-item-attribute.model';
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
