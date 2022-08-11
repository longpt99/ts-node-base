import { Request, Response } from 'express';
import { router } from '../../libs';
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
    this.router.get(`${this.path}/ping`, [this.ping.bind(this)]);
  }

  /**
   * @api {get} /api/v1/healths/ping Health check
   * @apiName GetUser
   * @apiGroup Healths
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  async ping(req: Request, res: Response) {
    return res.handler(this.healthService.ping());
  }
}
