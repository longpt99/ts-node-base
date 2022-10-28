import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'text' })
  public name: string;

  @Column({ type: 'text' })
  public mimetype: string;

  @Column({ type: 'int' })
  public size: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
