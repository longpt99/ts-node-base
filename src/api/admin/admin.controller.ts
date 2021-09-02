import { Request, Response } from 'express';
import AdminService from './admin.service';

const adminService = new AdminService();

export default class AdminController {
  constructor() {}

  async create(req: Request, res: Response): Promise<any> {
    return adminService
      .create()
      .then((data) => res.success(data))
      .catch((err) => res.error(err));
  }
}
