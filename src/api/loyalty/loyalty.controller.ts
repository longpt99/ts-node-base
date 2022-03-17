import { Request, Response } from 'express';
import { LoyaltyModel } from './loyalty.interface';
import loyaltyService from './loyalty.service';

class LoyaltyController {
  constructor() {}

  //#region Admin section
  async create(req: Request, res: Response): Promise<LoyaltyModel> {
    return res.result(loyaltyService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<LoyaltyModel[]> {
    return res.result(loyaltyService.list());
  }

  async getById(req: Request, res: Response) {
    return res.result(loyaltyService.getById());
  }

  async updateById(req: Request, res: Response): Promise<LoyaltyModel> {
    return res.result(loyaltyService.getById());
  }

  async deleteById(req: Request, res: Response): Promise<LoyaltyModel[]> {
    return res.result(loyaltyService.list());
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}

export default new LoyaltyController();
