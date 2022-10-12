import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppObject } from '../../common/consts';
import { StringUtil } from '../../utils';
import APP_CONFIG from '../../configs/app.config';
import { PhoneNumberProperties } from '../user/user.interface';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public firstName: string;

  @Column({ type: 'int', default: 1 })
  public old: number;

  @Column({ type: 'varchar', length: 50 })
  public lastName: string;

  @Column({ type: 'varchar', length: 100 })
  public email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  public password: string;

  @Column({
    type: 'enum',
    enum: AppObject.ROLES,
    default: AppObject.ROLES.STAFF,
  })
  public role: string;

  @Column({
    type: 'enum',
    enum: Object.values(AppObject.USER_STATUS),
    default: AppObject.USER_STATUS.ACTIVE,
  })
  public status: string;

  @Column({ type: 'jsonb', nullable: true })
  public mobilePhone: PhoneNumberProperties;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  async beforeInsert() {
    this.password = StringUtil.encrypt(
      this.password,
      APP_CONFIG.ENV.SECURE.PASSWORD_SECRET_KEY
    );

    if (this.firstName) {
      this.firstName = StringUtil.titleCase(this.firstName);
    }

    if (this.lastName) {
      this.lastName = StringUtil.titleCase(this.lastName);
    }
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
