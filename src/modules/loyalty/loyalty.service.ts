import { getCustomRepository } from 'typeorm';
import { UnauthorizedError } from '../../libs/errors';
import { LoyaltyRepository } from './loyalty.repository';

export class LoyaltyService {
  private static instance: LoyaltyService;
  private loyaltyRepository: LoyaltyRepository;

  constructor() {
    if (LoyaltyService.instance) {
      return LoyaltyService.instance;
    }

    this.loyaltyRepository = getCustomRepository(LoyaltyRepository);
    LoyaltyService.instance = this;
  }

  async create(params) {
    throw new UnauthorizedError();
  }

  async getById(params?) {
    console.log(params.error.b);
  }

  async list() {}
}
