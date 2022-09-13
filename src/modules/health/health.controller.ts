import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { HealthService } from './health.service';

export default class HealthController {
  private readonly healthService: HealthService;
  private readonly path = '/healths';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.healthService = new HealthService();
  }

  private _initializeRoutes() {
    this.router.get(`${this.path}/ping`, [this.ping.bind(this)]);
  }

  /**
   * @api {get} /api/v1/healths/ping Health check
   * @apiName Get status health check
   * @apiGroup Healths
   */
  async ping(req: Request, res: Response) {
    return res.handler(this.healthService.ping());
  }
}
