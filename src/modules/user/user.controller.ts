import { Request, Response } from 'express';
import { validate } from '../../common';
import { AppObject } from '../../common/consts';
import { UUIDValidation } from '../../common/validations/uuid.validation';
import { RouteConfig } from '../../libs';
import { UserService } from './user.service';

export default class UserController {
  private userService: UserService;
  private readonly adminPath = '/admin/users';
  private readonly userPath = '/users';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.userService = new UserService();
  }

  private _initializeRoutes() {
    //#region Admin section
    this.router.get(`${this.adminPath}`, [this.list.bind(this)], {
      roles: [AppObject.ADMIN_ROLES.ADMIN, AppObject.ADMIN_ROLES.SUPER_ADMIN],
    });

    this.router.get(
      `${this.adminPath}/:id`,
      [validate(UUIDValidation), this.getById.bind(this)],
      {
        roles: [AppObject.ADMIN_ROLES.ADMIN, AppObject.ADMIN_ROLES.SUPER_ADMIN],
      }
    );

    this.router.delete(
      `${this.adminPath}/:id`,
      [validate(UUIDValidation), this.deleteById.bind(this)],
      {
        roles: [AppObject.ADMIN_ROLES.ADMIN, AppObject.ADMIN_ROLES.SUPER_ADMIN],
      }
    );

    //#endregion Admin section

    //#region User section
    this.router.get(`${this.userPath}/profile`, [this.getProfile.bind(this)], {
      roles: [AppObject.CUSTOMER_ROLES.CUSTOMER],
    });

    this.router.patch(
      `${this.userPath}/profile`,
      [this.updateProfile.bind(this)],
      { roles: [AppObject.CUSTOMER_ROLES.CUSTOMER] }
    );
    //#endregion User section
  }

  //#region Admin section
  private async create(req: Request, res: Response) {
    return res.handler(this.userService.create(req.body));
  }

  private async list(req: Request, res: Response) {
    return res.handler(this.userService.list(req.query));
  }

  private async getById(req: Request, res: Response) {
    return res.handler(this.userService.getProfile(req.params.id));
  }

  private async updateById(req: Request, res: Response) {
    return res.handler(this.userService.getById());
  }

  private async deleteById(req: Request, res: Response) {
    return res.handler(this.userService.deleteById(req.params.id));
  }
  //#endregion Admin section

  private async getProfile(req: Request, res: Response) {
    return res.handler(this.userService.getProfile(req.user.id));
  }

  private async updateProfile(req: Request, res: Response) {
    return res.handler(this.userService.getProfile(req.user.id));
  }

  //#region User section
  //#end region User section
}
