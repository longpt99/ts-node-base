import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions';
import { OrderItem } from './order-item.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends BaseRepository<OrderItem> {}
