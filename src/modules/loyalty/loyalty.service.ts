import { getCustomRepository } from 'typeorm';
import { ErrorHandler } from '../../libs/error';
import StatusCodes from '../../utils/status-code';
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
    throw new ErrorHandler({ message: `I'm a Teapot` });
    return {
      name: 'Long',
    };
    return this.loyaltyRepository.save(
      this.loyaltyRepository.create(params as LoyaltyModel)
    );
  }

  async getById(params?) {
    console.log(params.error.b);
  }

  async list() {}
}
