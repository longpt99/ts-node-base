import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;
  private readonly adminPath = '/admin/users';
  private readonly userPath = '/user';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.userService = new UserService();
  }

  private _initializeRoutes() {
    //#region Admin section
    this.router.get(`${this.userPath}/profile`, [this.getProfile.bind(this)]);
    this.router.patch(`${this.userPath}/profile`, [
      this.updateProfile.bind(this),
    ]);
  }

  //#region Admin section
  private async create(req: Request, res: Response): Promise<any> {
    return res.handler(this.userService.create(req.body));
  }

  private async list(req: Request, res: Response): Promise<any[]> {
    return res.handler(this.userService.list());
  }

  private async getById(req: Request, res: Response) {
    return res.handler(this.userService.getById());
  }

  private async updateById(req: Request, res: Response): Promise<any> {
    return res.handler(this.userService.getById());
  }

  private async deleteById(req: Request, res: Response): Promise<any[]> {
    return res.handler(this.userService.list());
  }
  //#endregion Admin section

  private async getProfile(req: Request, res: Response): Promise<any[]> {
    return res.handler(this.userService.getProfile(req.user.id));
  }

  private async updateProfile(req: Request, res: Response): Promise<any[]> {
    return res.handler(this.userService.getProfile(req.user.id));
  }

  //#region User section
  //#end region User section
}
