import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends BaseRepository<Category> {}
