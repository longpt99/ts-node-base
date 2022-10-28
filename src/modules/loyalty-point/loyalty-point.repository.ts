import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions';
import { LoyaltyPoint } from './loyalty-point.entity';

@EntityRepository(LoyaltyPoint)
export class LoyaltyPointRepository extends BaseRepository<LoyaltyPoint> {}
