/**
 * Controller
 * @module Order Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { AppObject } from '../../common/consts';
import { RouteConfig } from '../../libs';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

export default class OrderController {
  private readonly orderService: OrderService;
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.orderService = new OrderService();
  }

  private _initializeRoutes() {
    const adminPath = '/admin/orders';
    this.router.get(`${adminPath}`, [this.list.bind(this)]);
    this.router.post(`${adminPath}`, [this.create.bind(this)]);
    this.router.get(`${adminPath}/:id`, [this.getById.bind(this)]);
    this.router.patch(`${adminPath}/:id`, [this.updateById.bind(this)]);
    this.router.delete(`${adminPath}/:id`, [this.deleteById.bind(this)]);

    //#region User section
    const userPath = '/orders';
    this.router.post(`${userPath}`, [this.create.bind(this)], {
      roles: [AppObject.CUSTOMER_ROLES.CUSTOMER],
    });

    //#endregion User section
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
    return res.handler(
      this.orderService.create({ user: req.user, body: req.body })
    );
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
