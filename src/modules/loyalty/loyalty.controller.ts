import { Request, Response } from 'express';
import { router } from '../../common';
import { ErrorHandler } from '../../libs/error';
import { LoyaltyModel } from './loyalty.interface';
import { LoyaltyService } from './loyalty.service';

export default class LoyaltyController {
  private readonly loyaltyService = new LoyaltyService();

  private readonly adminPath = '/admin/loyalties';
  private readonly userPath = '/loyalty';
  private readonly router = router;

  constructor() {
    this._initializeRoutes();
  }

  private _initializeRoutes() {
    //#region Admin section
    this.router.get(`${this.adminPath}`, [this.create]);
    this.router.post(`${this.adminPath}`, [this.create.bind(this)]);
    this.router.patch(`${this.adminPath}/:id`, [this.create]);
    this.router.delete(`${this.adminPath}/:id`, [this.create]);

    //#region User section
    this.router.get(this.userPath, [this.list]);
  }

  //#region Admin section
  async create(req: Request, res: Response): Promise<any> {
    throw new ErrorHandler({ message: 'test' });
    return res.handler(this.loyaltyService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<LoyaltyModel[]> {
    return res.handler(this.loyaltyService.list());
  }

  async getById(req: Request, res: Response) {
    return res.handler(this.loyaltyService.getById());
  }

  async updateById(req: Request, res: Response): Promise<LoyaltyModel> {
    return res.handler(this.loyaltyService.getById());
  }

  async deleteById(req: Request, res: Response): Promise<LoyaltyModel[]> {
    return res.handler(this.loyaltyService.list());
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}
