import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends BaseRepository<Order> {}
