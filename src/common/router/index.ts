import { Router } from 'express';
import { RouteOptions } from './router.interface';

export const expressRouter = Router();

export class Index {
  static get(path: string, fn: any[], options?: RouteOptions): Index {
    return Index.router('get', path, fn, options);
  }

  static post(path: string, fn: any[], options?: RouteOptions): Index {
    return Index.router('post', path, fn, options);
  }

  static put(path: string, fn: any[], options?: RouteOptions): Index {
    return Index.router('put', path, fn, options);
  }

  static patch(path: string, fn: any[], options?: RouteOptions): Index {
    return Index.router('patch', path, fn, options);
  }

  static delete(path: string, fn: any[], options?: RouteOptions): Index {
    return Index.router('delete', path, fn, options);
  }

  static router(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    fn: any[],
    options?: RouteOptions
  ): Index {
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
    return expressRouter[method](path, fn);
  }
}
