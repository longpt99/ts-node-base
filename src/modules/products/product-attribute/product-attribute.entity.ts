import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppObject } from '../../../common/consts';
import { OrderItemAttribute } from '../../order-item-attribute/order-item-attribute.entity';
import { Product } from '../product/product.entity';

@Entity()
export class ProductAttribute {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'int', nullable: true })
  public quantity: number;

  @Column({ type: 'boolean', default: false })
  public isDefault: boolean;

  @Column({ type: 'int', default: 0 })
  public priority: number;

  @Column({ type: 'numeric', default: 0 })
  public price: number;

  @Column({ type: 'varchar', length: 50 })
  public key: string;

  @Column({ type: 'varchar', length: 50 })
  public value: string;

  @Column({
    type: 'enum',
    enum: AppObject.PRODUCT_STATUS,
    default: AppObject.PRODUCT_STATUS.INACTIVE,
  })
  public status: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  public onwerId: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  // Relationship Section
  @ManyToOne(() => Product, (product) => product.productAttributes)
  public product: Product;

  @OneToMany(
    () => OrderItemAttribute,
    (orderItemAttributes) => orderItemAttributes.productAttribute
  )
  public orderItemAttributes: OrderItemAttribute[];
}
