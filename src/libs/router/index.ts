import express from 'express';
import { RouteOptions } from './router.interface';

export const expressRouter = express.Router();

export class RouteConfig {
  static globalPrefix: string;
  constructor() {}

  static get(path: string, fn: any[], options?: RouteOptions): RouteConfig {
    return RouteConfig.router('get', path, fn, options);
  }

  static post(path: string, fn: any[], options?: RouteOptions): RouteConfig {
    return RouteConfig.router('post', path, fn, options);
  }

  static put(path: string, fn: any[], options?: RouteOptions): RouteConfig {
    return RouteConfig.router('put', path, fn, options);
  }

  static patch(path: string, fn: any[], options?: RouteOptions): RouteConfig {
    return RouteConfig.router('patch', path, fn, options);
  }

  static delete(path: string, fn: any[], options?: RouteOptions): RouteConfig {
    return RouteConfig.router('delete', path, fn, options);
  }

  static router(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    fn: any[],
    options?: RouteOptions
  ): RouteConfig {
    if (options) {
      if (options.allowAnonymous) {
        console.log('Verify token base');
        // fn.unshift('token');
      } else {
        if (options.roles) {
          console.log('Role');
        }
        // fn.unshift('token');
      }
    }

    return expressRouter[method](`${RouteConfig.globalPrefix}${path}`, fn);
  }
}
