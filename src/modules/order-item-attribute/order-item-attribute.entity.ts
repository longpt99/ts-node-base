import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from '../order-item/order-item.entity';

@Entity()
export class OrderItemAttribute {
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

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.orderItemAttributes)
  public orderItem: OrderItem;
}
