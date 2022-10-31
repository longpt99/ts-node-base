import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemAttribute } from '../order-item-attribute/order-item-attribute.entity';
import { Order } from '../order/order.entity';
import { Product } from '../products/product/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'int' })
  public quantity: number;

  @Column({ type: 'numeric' })
  public price: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  // Relationship Section
  @OneToMany(
    () => OrderItemAttribute,
    (orderItemAttribute) => orderItemAttribute.orderItem
  )
  public orderItemAttributes: OrderItemAttribute[];

  @ManyToOne(() => Order, (order) => order.orderItems)
  public order: Order;

  @OneToOne(() => Product)
  @JoinColumn()
  public product: Product;
}
