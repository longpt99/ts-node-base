import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from '../order-item/order-item.entity';
import { ProductAttribute } from '../products/product-attribute/product-attribute.entity';

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

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  // Relationship Section
  @ManyToOne(() => OrderItem, (orderItem) => orderItem.orderItemAttributes)
  public orderItem: OrderItem;

  @ManyToOne(() => ProductAttribute, (productAttribute) => productAttribute)
  public productAttribute: ProductAttribute;
}
