import { Request, Response } from 'express';
import { LoyaltyModel } from './loyalty.interface';
import { LoyaltyService } from './loyalty.service';

export class LoyaltyController {
  private loyaltyService: LoyaltyService;

  constructor() {
    this.loyaltyService = new LoyaltyService();
  }

  //#region Admin section
  async create(req: Request, res: Response): Promise<LoyaltyModel> {
    return res.handler(this.loyaltyService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<LoyaltyModel[]> {
    return res.handler(this.loyaltyService.list());
  }

  async getById(req: Request, res: Response) {
    return res.handler(this.loyaltyService.getById());
  }

  async updateById(req: Request, res: Response): Promise<LoyaltyModel> {
    return res.handler(this.loyaltyService.getById());
  }

  async deleteById(req: Request, res: Response): Promise<LoyaltyModel[]> {
    return res.handler(this.loyaltyService.list());
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}
