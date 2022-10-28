/**
 * Controller
 * @module LoyaltyPoint Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { AppObject } from '../../common/consts';
import { RouteConfig } from '../../libs';
import { LoyaltyPointModel } from './loyalty-point.model';
import { LoyaltyPointService } from './loyalty-point.service';

export default class LoyaltyPointController {
  private readonly loyaltyPointService: LoyaltyPointService;
  private readonly adminPath = '/admin/loyalty-point';
  private readonly userPath = '/loyalty-point';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.loyaltyPointService = new LoyaltyPointService();
  }

  private _initializeRoutes() {
    //#region Admin section
    this.router.get(`${this.adminPath}`, [this.list.bind(this)]);
    this.router.post(`${this.adminPath}`, [this.create.bind(this)]);
    this.router.get(`${this.adminPath}/:id`, [this.getById.bind(this)]);
    this.router.patch(`${this.adminPath}/:id`, [this.updateById.bind(this)]);
    this.router.delete(`${this.adminPath}/:id`, [this.deleteById.bind(this)]);
    //#endregion Admin section

    this.router.get(`/loyalty-points`, [this.getPoint.bind(this)], {
      roles: [AppObject.CUSTOMER_ROLES.CUSTOMER],
    });
  }

  /**
   * @method list
   * @description Get list
   */
  async list(req: Request, res: Response) {
    return res.handler(this.loyaltyPointService.list());
  }

  /**
   * @method create
   * @description Create new loyalty-point
   */
  async create(req: Request, res: Response) {
    return res.handler(this.loyaltyPointService.create());
  }

  /**
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.loyaltyPointService.getById());
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(req: Request, res: Response): Promise<LoyaltyPointModel> {
    return res.handler(this.loyaltyPointService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(req: Request, res: Response): Promise<LoyaltyPointModel[]> {
    return res.handler(this.loyaltyPointService.deleteById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async getPoint(req: Request, res: Response): Promise<LoyaltyPointModel[]> {
    return res.handler(this.loyaltyPointService.getPoint(req.user));
  }
}
