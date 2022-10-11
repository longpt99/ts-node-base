import { Request, Response } from 'express';
import { validate } from '../../common';
import { UUIDValidation } from '../../common/validations/uuid.validation';
import { RouteConfig } from '../../libs';
import { AdminService } from './admin.service';
import { AdminValidation } from './admin.validation';

export default class AdminController {
  private readonly router = RouteConfig;
  private readonly path = '/admin';
  private readonly adminService: AdminService;

  constructor() {
    this.initializeRoutes();
    this.adminService = new AdminService();
  }

  private initializeRoutes() {
    this.router.post(this.path, [
      validate(AdminValidation.create),
      this.create.bind(this),
    ]);

    this.router.get(`${this.path}/:id`, [
      validate(UUIDValidation),
      this.detailById.bind(this),
    ]);
  }

  async create(req: Request, res: Response) {
    return res.handler(this.adminService.create(req.body));
  }

  async detailById(req: Request, res: Response) {
    return res.handler(this.adminService.detailById(req.params.id));
  }
}
