/**
 * Controller
 * @module Category Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';

export default class CategoryController {
  private readonly categoryService: CategoryService;
  private readonly adminPath = '/admin/category';
  private readonly userPath = '/category';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.categoryService = new CategoryService();
  }

  private _initializeRoutes() {
    this.router.get(`${this.adminPath}`, [this.list.bind(this)]);
    this.router.post(`${this.adminPath}`, [this.create.bind(this)]);
    this.router.get(`${this.adminPath}/:id`, [this.getById.bind(this)]);
    this.router.patch(`${this.adminPath}/:id`, [this.updateById.bind(this)]);
    this.router.delete(`${this.adminPath}/:id`, [this.deleteById.bind(this)]);
  }

  /**
   * @method list
   * @description Get list
   */
  async list(req: Request, res: Response) {
    return res.handler(this.categoryService.list());
  }

  /**
   * @method create
   * @description Create new category
   */
  async create(req: Request, res: Response) {
    return res.handler(this.categoryService.create());
  }

  /**
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.categoryService.getById());
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(req: Request, res: Response): Promise<CategoryModel> {
    return res.handler(this.categoryService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(req: Request, res: Response): Promise<CategoryModel[]> {
    return res.handler(this.categoryService.deleteById());
  }
}
