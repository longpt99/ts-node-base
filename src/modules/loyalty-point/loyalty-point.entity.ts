import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class LoyaltyPoint {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @Column({ type: 'int', default: 0 })
  public point: number;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  // Relationship Section
  @OneToOne(() => User)
  @JoinColumn()
  public user: User;
}
