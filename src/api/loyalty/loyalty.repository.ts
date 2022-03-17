import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/extensions';
import { Loyalty } from './loyalty.entity';

@EntityRepository(Loyalty)
export class LoyaltyRepository extends BaseRepository<Loyalty> {}
