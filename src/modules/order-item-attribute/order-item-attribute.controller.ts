/**
 * Controller
 * @module OrderItemAttribute Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { OrderItemAttributeModel } from './order-item-attribute.model';
import { OrderItemAttributeService } from './order-item-attribute.service';

export default class OrderItemAttributeController {
  private readonly orderItemAttributeService: OrderItemAttributeService;
  private readonly adminPath = '/admin/order-item-attribute';
  private readonly userPath = '/order-item-attribute';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.orderItemAttributeService = new OrderItemAttributeService();
  }

  private _initializeRoutes() {
    this.router.get(`${this.adminPath}`, [this.list.bind(this)]);
    this.router.post(`${this.adminPath}`, [this.create.bind(this)]);
    this.router.get(`${this.adminPath}/:id`, [this.getById.bind(this)]);
    this.router.patch(`${this.adminPath}/:id`, [this.updateById.bind(this)]);
    this.router.delete(`${this.adminPath}/:id`, [this.deleteById.bind(this)]);
  }

  /**
   * @method list
   * @description Get list
   */
  async list(req: Request, res: Response) {
    return res.handler(this.orderItemAttributeService.list());
  }

  /**
   * @method create
   * @description Create new order-item-attribute
   */
  async create(req: Request, res: Response) {
    return res.handler(this.orderItemAttributeService.create());
  }

  /**
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.orderItemAttributeService.getById());
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(
    req: Request,
    res: Response
  ): Promise<OrderItemAttributeModel> {
    return res.handler(this.orderItemAttributeService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(
    req: Request,
    res: Response
  ): Promise<OrderItemAttributeModel[]> {
    return res.handler(this.orderItemAttributeService.deleteById());
  }
}
