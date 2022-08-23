import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppObject } from '../../common/consts';
import { PhoneNumberProperties } from './user.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'text', nullable: true })
  public firstName: string;

  @Column({ type: 'text', nullable: true })
  public lastName: string;

  @Column({ type: 'date', nullable: true })
  public dateOfBirth: Date;

  @Column({ type: 'text', nullable: true })
  public gender: string;

  @Column({ type: 'text', nullable: true })
  public email: string;

  @Column({ type: 'jsonb', nullable: true })
  @Index({ unique: true })
  public mobilePhone: PhoneNumberProperties;

  @Column({
    type: 'enum',
    enum: Object.values(AppObject.COMMON_STATUS),
    default: AppObject.COMMON_STATUS.UNVERIFIED,
  })
  public status: string;

  @Column({ type: 'text', nullable: true })
  public facebookId: string;

  @Column({ type: 'text', nullable: true })
  public googleId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  async beforeInsert() {
    // this.password = StringUtil.encrypt(
    //   this.password,
    //   APP_CONFIG.ENV.SECURE.PASSWORD_SECRET_KEY
    // );
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

      // this.fullName = `${this.firstName} ${this.lastName}`;
    }
  }

  // async comparePassword(password: string): Promise<boolean> {
  // return (
  //   password ===
  //   StringUtil.decrypt(
  //     this.password,
  //     APP_CONFIG.ENV.SECURE.PASSWORD_SECRET_KEY
  //   )
  // );
  // }
}
