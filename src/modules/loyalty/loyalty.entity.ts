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
export class Loyalty {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'int' })
  public point: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  // Relationship Section
  @OneToOne(() => User)
  @JoinColumn()
  public user: User;
}
