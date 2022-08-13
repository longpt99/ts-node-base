import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions';
import { Loyalty } from './upload.entity';

@EntityRepository(Loyalty)
export class LoyaltyRepository extends BaseRepository<Loyalty> {}
