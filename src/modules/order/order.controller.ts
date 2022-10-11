/**
 * Controller
 * @module Order Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

export default class OrderController {
  private readonly orderService: OrderService;
  private readonly adminPath = '/admin/order';
  private readonly userPath = '/order';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.orderService = new OrderService();
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
    return res.handler(this.orderService.list());
  }

  /**
   * @method create
   * @description Create new order
   */
  async create(req: Request, res: Response) {
    return res.handler(this.orderService.create());
  }

  /**
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.orderService.getById());
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(req: Request, res: Response): Promise<OrderModel> {
    return res.handler(this.orderService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(req: Request, res: Response): Promise<OrderModel[]> {
    return res.handler(this.orderService.deleteById());
  }
}
