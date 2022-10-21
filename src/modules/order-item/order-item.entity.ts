import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemAttribute } from '../order-item-attribute/order-item-attribute.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'int' })
  public quantity: number;

  @Column({ type: 'numeric' })
  public price: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @OneToMany(
    () => OrderItemAttribute,
    (orderItemAttribute) => orderItemAttribute.orderItem
  )
  public orderItemAttributes: OrderItemAttribute[];
}
