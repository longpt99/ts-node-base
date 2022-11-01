import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppObject } from '../../../common/consts';
import { OrderItem } from '../../order-item/order-item.entity';
import { ProductAttribute } from '../product-attribute/product-attribute.entity';

@Entity()
@Index(AppObject.INDEX_DB.UNIQUE_PRODUCT, ['name'], {
  unique: true,
  where: `"isDeleted" IS FALSE`,
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Column({ type: 'varchar', length: 255 })
  public description: string;

  @Column({ type: 'numeric' })
  public price: number;

  @Column({ type: 'numeric', default: 0 })
  public discountPrice: number;

  @Column({ type: 'int' })
  public quantity: number;

  @Column({
    type: 'enum',
    enum: AppObject.PRODUCT_CATEGORY,
    default: AppObject.PRODUCT_CATEGORY.COFFEE,
  })
  public category: string;

  @Column({
    type: 'enum',
    enum: AppObject.PRODUCT_STATUS,
    default: AppObject.PRODUCT_STATUS.INACTIVE,
  })
  public status: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @OneToMany(
    () => ProductAttribute,
    (productAttributes) => productAttributes.product
  )
  public productAttributes: ProductAttribute[];

  @OneToMany(() => OrderItem, (orderItems) => orderItems.product)
  public orderItems: OrderItem[];
}
