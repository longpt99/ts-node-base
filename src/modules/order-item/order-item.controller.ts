/**
 * Controller
 * @module OrderItem Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { OrderItemModel } from './order-item.model';
import { OrderItemService } from './order-item.service';

export default class OrderItemController {
  private readonly orderItemService: OrderItemService;
  private readonly adminPath = '/admin/order-item';
  private readonly userPath = '/order-item';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.orderItemService = new OrderItemService();
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
    return res.handler(this.orderItemService.list());
  }

  /**
   * @method create
   * @description Create new order-item
   */
  async create(req: Request, res: Response) {
    return res.handler(this.orderItemService.create());
  }

  /**
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.orderItemService.getById());
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(req: Request, res: Response): Promise<OrderItemModel> {
    return res.handler(this.orderItemService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(req: Request, res: Response): Promise<OrderItemModel[]> {
    return res.handler(this.orderItemService.deleteById());
  }
}
