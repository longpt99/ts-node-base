import { Request, Response } from 'express';
import { HealthService } from './health.service';

export class HealthController {
  private healthService: HealthService;

  constructor() {
    this.healthService = new HealthService();
  }

  //#region Admin section
  async ping(req: Request, res: Response) {
    return res.result(this.healthService.ping());
  }
}
