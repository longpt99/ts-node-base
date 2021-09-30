import { Request, Response } from 'express';
import { IUser } from './user.schema';
import UserService from './user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response): Promise<any> {
    return res.result(this.userService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<IUser[]> {
    return res.result(this.userService.list());
  }

  async getById(req: Request, res: Response) {
    return res.result(this.userService.getById());
  }

  async updateById(req: Request, res: Response): Promise<IUser> {
    return res.result(this.userService.getById());
  }

  async deleteById(req: Request, res: Response): Promise<IUser[]> {
    return res.result(this.userService.list());
  }
}
