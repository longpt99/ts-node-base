import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../libs/extensions';
import { ProductAttribute } from './product-attribute.entity';

@EntityRepository(ProductAttribute)
export class ProductAttributeRepository extends BaseRepository<ProductAttribute> {}
