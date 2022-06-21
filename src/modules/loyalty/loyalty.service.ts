import { getCustomRepository } from 'typeorm';
import { LoyaltyModel } from './loyalty.interface';
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
    return this.loyaltyRepository.save(
      this.loyaltyRepository.create(params as LoyaltyModel)
    );
  }

  async getById() {}

  async list() {}
}
