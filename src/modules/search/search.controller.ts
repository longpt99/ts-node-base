/**
 * Controller
 * @module Search Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { RouteConfig } from '../../libs';
import { SearchModel } from './search.model';
import { SearchService } from './search.service';

export default class SearchController {
  private readonly searchService: SearchService;
  private readonly adminPath = '/admin/search';
  private readonly userPath = '/search';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.searchService = new SearchService();
  }

  private _initializeRoutes() {
    this.router.post(`${this.adminPath}/index`, [this.create.bind(this)]);
    this.router.post(`${this.adminPath}/add`, [this.insert.bind(this)]);
    this.router.get(`/search`, [this.search.bind(this)]);
    this.router.get(`/search/count`, [this.count.bind(this)]);
  }

  /**
   * @method list
   * @description Get list
   */
  async list(req: Request, res: Response) {
    return res.handler(this.searchService.list());
  }

  /**
   * @method create
   * @description Create new search
   */
  async create(req: Request, res: Response) {
    return res.handler(this.searchService.createIndex());
  }

  /**
   * @method create
   * @description Create new search
   */
  async search(req: Request, res: Response) {
    return res.handler(this.searchService.search());
  }
  /**
   * @method create
   * @description Create new search
   */
  async count(req: Request, res: Response) {
    return res.handler(this.searchService.count());
  }

  /**
   * @description Get detail by id
   * @param req
   * @param res
   */
  async insert(req: Request, res: Response) {
    return res.handler(this.searchService.insert());
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(req: Request, res: Response): Promise<SearchModel> {
    return res.handler(this.searchService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(req: Request, res: Response): Promise<SearchModel[]> {
    return res.handler(this.searchService.deleteById());
  }
}
