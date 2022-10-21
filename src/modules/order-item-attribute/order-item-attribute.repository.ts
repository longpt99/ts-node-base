import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions';
import { OrderItemAttribute } from './order-item-attribute.entity';

@EntityRepository(OrderItemAttribute)
export class OrderItemAttributeRepository extends BaseRepository<OrderItemAttribute> {}
