/**
 * LoyaltyPoint Service
 * @module LoyaltyPoint Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';

import { LoyaltyPointRepository } from './loyalty-point.repository';

export class LoyaltyPointService {
  private static instance: LoyaltyPointService;
  private loyaltyPointRepository: LoyaltyPointRepository;

  constructor() {
    if (LoyaltyPointService.instance) {
      return LoyaltyPointService.instance;
    }

    this.loyaltyPointRepository = getCustomRepository(LoyaltyPointRepository);
    LoyaltyPointService.instance = this;
  }

  /**
   * @method create
   * @description Create new loyalty-point
   */
  async create() {
    return;
  }

  /**
   * @method list
   * @description Get list
   */
  async list() {
    return;
  }

  /**
   * @async
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById() {
    return;
  }

  /**
   * @async
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById() {
    return;
  }

  /**
   * @async
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById() {
    return;
  }

  /**
   * @async
   * @method getPoint
   * @description Delete by id
   * @param params {id}
   */
  async getPoint(user: Express.TokenModel) {
    let data = await this.loyaltyPointRepository
      .createQueryBuilder('point')
      .where('point.user = :userId', { userId: user.id })
      .getOne();

    if (!data) {
      data = await this.loyaltyPointRepository.createDoc({ user: user });
    }

    return { point: data.point };
  }
}
