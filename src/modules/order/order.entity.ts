import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from '../order-item/order-item.entity';
import { User } from '../user/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'numeric' })
  public price: number;

  @Column({ type: 'numeric' })
  public discountPrice: number;

  @Column({ type: 'int' })
  public quantity: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  public isDeleted: string;

  // Relationship Section
  @ManyToOne(() => User, (user) => user.orders)
  public user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public orderItems: OrderItem[];
}
