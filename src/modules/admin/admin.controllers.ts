import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import AdminService from './admin.service';

export default class AdminController {
  private readonly router = RouteConfig;
  private readonly path = '/admin';
  private readonly adminService: AdminService;

  constructor() {
    this.initializeRoutes();
    this.adminService = new AdminService();
  }

  private initializeRoutes() {
    this.router.get(this.path, [this.create]);
  }

  async create(req: Request, res: Response): Promise<any> {
    return this.adminService
      .create()
      .then((data) => res.success(data))
      .catch((err) => res.error(err));
  }
}
