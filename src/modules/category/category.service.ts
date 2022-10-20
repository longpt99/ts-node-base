/**
 * Category Service
 * @module Category Controller
 * @description Config controller
 */

import { getCustomRepository } from 'typeorm';

import { ErrorHandler, UnauthorizedError } from '../../libs/errors';
import StatusCodes from '../../utils/status-code';
import { CategoryModel } from './category.model';
import { CategoryRepository } from './category.repository';

export class CategoryService {
  private static instance: CategoryService;
  private categoryRepository: CategoryRepository;

  constructor() {
    if (CategoryService.instance) {
      return CategoryService.instance;
    }

    this.categoryRepository = getCustomRepository(CategoryRepository);
    CategoryService.instance = this;
  }

  /**
   * @method create
   * @description Create new category
   */
  async create() {
    return;
  }

  /**
   * @method list
   * @description Get list
   */
  async list() {
    return;
  }

  /**
   * @async
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById() {
    return;
  }

  /**
   * @async
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById() {
    return;
  }

  /**
   * @async
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById() {
    return;
  }
}
