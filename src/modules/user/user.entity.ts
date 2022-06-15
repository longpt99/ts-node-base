import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StringUtil } from '../../utils';
import APP_CONFIG from '../../config/app.config';
import { AppObject } from '../../common/consts';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  firstName: string;

  @Column({ type: 'text', nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  dateOfBirth: string;

  @Column({ type: 'text', nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  notification: boolean;

  @Column({
    type: 'enum',
    enum: Object.values(AppObject.COMMON_STATUS),
    default: AppObject.COMMON_STATUS.UNVERIFIED,
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  facebookId: string;

  @Column({ type: 'text', nullable: true })
  googleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async preSave() {
    this.password = StringUtil.encrypt(
      this.password,
      APP_CONFIG.ENV.SECURE.PASSWORD_SECRET_KEY
    );
    if (this.firstName || this.lastName) {
      this.firstName = this.firstName
        .split(' ')
        .map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        )
        .join(' ');

      this.lastName = this.lastName
        .split(' ')
        .map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        )
        .join(' ');

      this.fullName = `${this.firstName} ${this.lastName}`;
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return (
      password ===
      StringUtil.decrypt(
        this.password,
        APP_CONFIG.ENV.SECURE.PASSWORD_SECRET_KEY
      )
    );
  }
}
