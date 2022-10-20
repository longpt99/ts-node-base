import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.orders)
  public user: User;
}
