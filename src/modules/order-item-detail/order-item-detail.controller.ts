/**
 * Controller
 * @module OrderItemDetail Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { OrderItemDetailModel } from './order-item-detail.model';
import { OrderItemDetailService } from './order-item-detail.service';

export default class OrderItemDetailController {
  private readonly orderItemDetailService: OrderItemDetailService;
  private readonly adminPath = '/admin/order-item-detail';
  private readonly userPath = '/order-item-detail';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.orderItemDetailService = new OrderItemDetailService();
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
    return res.handler(this.orderItemDetailService.list());
  }

  /**
   * @method create
   * @description Create new order-item-detail
   */
  async create(req: Request, res: Response) {
    return res.handler(this.orderItemDetailService.create());
  }

  /**
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.orderItemDetailService.getById());
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(req: Request, res: Response): Promise<OrderItemDetailModel> {
    return res.handler(this.orderItemDetailService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(
    req: Request,
    res: Response
  ): Promise<OrderItemDetailModel[]> {
    return res.handler(this.orderItemDetailService.deleteById());
  }
}
