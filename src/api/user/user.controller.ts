import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  //#region Admin section
  async create(req: Request, res: Response): Promise<any> {
    return res.result(this.userService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<any[]> {
    return res.result(this.userService.list());
  }

  async getById(req: Request, res: Response) {
    return res.result(this.userService.getById());
  }

  async updateById(req: Request, res: Response): Promise<any> {
    return res.result(this.userService.getById());
  }

  async deleteById(req: Request, res: Response): Promise<any[]> {
    return res.result(this.userService.list());
  }

  async getProfile(req: Request, res: Response): Promise<any[]> {
    return res.result(this.userService.getProfile(req.user.id));
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}
