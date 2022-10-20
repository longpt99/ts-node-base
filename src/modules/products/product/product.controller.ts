/**
 * Controller
 * @module Product Controller
 * @description Config controller
 */

import { Request, Response } from 'express';
import { validate } from '../../../common';
import { AppObject } from '../../../common/consts';
import { UUIDValidation } from '../../../common/validations/uuid.validation';
import { RouteConfig } from '../../../libs';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import { ProductValidation } from './product.validation';

class ProductController {
  private readonly productService: ProductService;
  private readonly adminPath = '/admin/products';
  private readonly prefix = '/products';
  private readonly router = RouteConfig;

  constructor() {
    this._initializeRoutes();
    this.productService = new ProductService();
  }

  private _initializeRoutes() {
    //#region Admin section
    this.router.get(`${this.adminPath}`, [this.list.bind(this)]);
    this.router.post(
      `${this.adminPath}`,
      [validate(ProductValidation.create), this.create.bind(this)],
      { roles: Object.values(AppObject.ADMIN_ROLES) }
    );
    this.router.get(`${this.adminPath}/:id`, [
      validate(UUIDValidation),
      this.getById.bind(this),
    ]);
    this.router.patch(`${this.adminPath}/:id`, [
      validate(UUIDValidation),
      this.updateById.bind(this),
    ]);
    this.router.delete(`${this.adminPath}/:id`, [
      validate(UUIDValidation),
      this.deleteById.bind(this),
    ]);
    //#endregion Admin section

    //#region User section
    this.router.get(`${this.prefix}`, [this.publicList.bind(this)]);
    this.router.get(`${this.prefix}/:id`, [
      validate(UUIDValidation),
      this.publicDetail.bind(this),
    ]);
    //#endregion User section
  }

  /**
   * @method list
   * @description Get list
   */
  async list(req: Request, res: Response) {
    return res.handler(this.productService.list(req.query));
  }

  /**
   * @method create
   * @description Create new product
   */
  async create(req: Request, res: Response) {
    return res.handler(this.productService.create(req.body));
  }

  /**
   * @method getById
   * @description Get detail by id
   * @param req
   * @param res
   */
  async getById(req: Request, res: Response) {
    return res.handler(this.productService.getById(req.params.id));
  }

  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById(req: Request, res: Response): Promise<ProductModel> {
    return res.handler(this.productService.updateById());
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById(req: Request, res: Response): Promise<ProductModel> {
    return res.handler(this.productService.deleteById(req.params.id));
  }

  //#region User section
  /**
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async publicList(req: Request, res: Response): Promise<ProductModel> {
    return res.handler(this.productService.publicList(req.query));
  }

  /**
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async publicDetail(req: Request, res: Response): Promise<ProductModel> {
    return res.handler(this.productService.publicDetail(req.params.id));
  }
  //#endregion User section
}

export default ProductController;
