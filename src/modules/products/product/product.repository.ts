import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../libs/extensions';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {}
