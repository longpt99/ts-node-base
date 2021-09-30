import { Request, Response } from 'express';
import AdminService from './admin.service';

export default class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  async create(req: Request, res: Response): Promise<any> {
    return this.adminService
      .create()
      .then((data) => res.success(data))
      .catch((err) => res.error(err));
  }
}
