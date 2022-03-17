import { getCustomRepository } from 'typeorm';
import { LoyaltyModel } from './loyalty.interface';
import { LoyaltyRepository } from './loyalty.repository';

class LoyaltyService {
  private loyaltyRepository: LoyaltyRepository;

  constructor() {
    this.loyaltyRepository = getCustomRepository(LoyaltyRepository);
  }

  async create(params: any) {
    return this.loyaltyRepository.save(
      this.loyaltyRepository.create(params as LoyaltyModel)
    );
  }

  async getById() {}

  async list() {}
}

export default new LoyaltyService();
