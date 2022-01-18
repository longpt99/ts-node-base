import { Request, Response } from 'express';
import { IUser } from './user.interface';
import userService from './user.service';

class UserController {
  constructor() {}

  //#region Admin section
  async create(req: Request, res: Response): Promise<any> {
    return res.result(userService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<IUser[]> {
    return res.result(userService.list());
  }

  async getById(req: Request, res: Response) {
    return res.result(userService.getById());
  }

  async updateById(req: Request, res: Response): Promise<IUser> {
    return res.result(userService.getById());
  }

  async deleteById(req: Request, res: Response): Promise<IUser[]> {
    return res.result(userService.list());
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}

export default new UserController();
