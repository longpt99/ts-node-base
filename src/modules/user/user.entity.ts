import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppObject } from '../../common/consts';
import APP_CONFIG from '../../configs/app.config';
import { StringUtil } from '../../utils';
import { Order } from '../order/order.entity';
import { PhoneNumberProperties } from './user.interface';

@Entity()
@Index('idx_unique_email', ['email'], {
  unique: true,
  where: `"isDeleted" IS FALSE AND "facebookId" IS NULL AND "googleId" IS NULL`,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public firstName: string;

  @Column({ type: 'varchar', length: 50 })
  public lastName: string;

  @Column({ type: 'date', nullable: true })
  public dateOfBirth: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public gender: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public email: string;

  @Column({ type: 'jsonb', nullable: true })
  public mobilePhone: PhoneNumberProperties;

  @Column({
    type: 'enum',
    enum: Object.values(AppObject.USER_STATUS),
    default: AppObject.USER_STATUS.UNVERIFIED,
  })
  public status: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public facebookId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public googleId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @OneToMany(() => Order, (orders) => orders.user)
  public orders: Order[];

  @BeforeInsert()
  async beforeInsert() {
    this.password = StringUtil.encrypt(
      this.password,
      APP_CONFIG.ENV.SECURE.PASSWORD_SECRET_KEY
    );
    this.firstName = StringUtil.titleCase(this.firstName);
    this.lastName = StringUtil.titleCase(this.lastName);
  }

  public comparePassword(password: string): boolean {
    return (
      password ===
      StringUtil.decrypt(
        this.password,
        APP_CONFIG.ENV.SECURE.PASSWORD_SECRET_KEY
      )
    );
  }
}
