import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions';
import { OrderItemDetail } from './order-item-detail.entity';

@EntityRepository(OrderItemDetail)
export class OrderItemDetailRepository extends BaseRepository<OrderItemDetail> {}
