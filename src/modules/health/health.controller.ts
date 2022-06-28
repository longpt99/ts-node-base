import { Request, Response } from 'express';
import { router } from '../../common';
import { HealthService } from './health.service';

export default class HealthController {
  private healthService: HealthService;
  private readonly path = '/healths';
  private readonly router = router;

  constructor() {
    this._initializeRoutes();
    this.healthService = new HealthService();
  }

  private _initializeRoutes() {
    this.router.get(`${this.path}/ping`, [this.ping]);
  }

  async ping(req: Request, res: Response) {
    return res.handler(this.healthService.ping());
  }
}
