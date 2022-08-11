import { Request, Response } from 'express';
import { router } from '../../libs';
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
    this.router.get(`${this.adminPath}`, [this.list.bind(this)]);
    this.router.post(`${this.adminPath}`, [this.create.bind(this)]);
    this.router.patch(`${this.adminPath}/:id`, [this.create]);
    this.router.delete(`${this.adminPath}/:id`, [this.create]);

    //#region User section
    this.router.get(this.userPath, [this.list]);
  }

  //#region Admin section
  /**
   * @api {get} /user/id Request User information
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  async create(req: Request, res: Response): Promise<any> {
    // throw new ErrorHandler({ message: 'test' });
    return res.handler(this.loyaltyService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<LoyaltyModel[]> {
    // throw new ErrorHandler({ message: 'test' });
    return res.handler(this.loyaltyService.list());
  }

  /**
   * @api {delete} /user/:id Request User information
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.loyaltyService.getById());
  }

  async updateById(req: Request, res: Response): Promise<LoyaltyModel> {
    return res.handler(this.loyaltyService.getById());
  }

  /**
   * @api {delete} /user/id Request User information
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  async deleteById(req: Request, res: Response): Promise<LoyaltyModel[]> {
    return res.handler(this.loyaltyService.list());
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}
