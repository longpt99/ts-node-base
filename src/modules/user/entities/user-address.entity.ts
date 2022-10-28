import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { PhoneNumberProperties } from '../user.interface';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'jsonb', nullable: true })
  public phoneNumber: PhoneNumberProperties;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  // Relationship Section
  @ManyToOne(() => User, (user) => user.addresses)
  public user: User[];
}
