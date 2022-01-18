import { Router } from 'express';

export const router = Router();

export class Route {
  public static get(path, fn, options?): Route {
    return Route.route('get', path, fn, options);
  }

  public static post(path, fn, options?): Route {
    return Route.route('post', path, fn, options);
  }

  public static put(path, fn, options?): Route {
    return Route.route('put', path, fn, options);
  }

  public static patch(path, fn, options?): Route {
    return Route.route('patch', path, fn, options);
  }

  public static delete(path, fn, options?): Route {
    return Route.route('delete', path, fn, options);
  }

  public static route(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    fn,
    options
  ): Route {
    if (options) {
      console.log('Route opts');
    }
    return router[method](path, fn);
  }
}
