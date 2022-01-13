import { Router } from 'express';

export const router = Router();

export class Route {
  public static get(path, fn, options?) {
    return Route.route('get', path, fn, options);
  }

  public static post(path, fn, options?) {
    return Route.route('post', path, fn, options);
  }

  public static put(path, fn, options?) {
    return Route.route('put', path, fn, options);
  }

  public static patch(path, fn, options?) {
    return Route.route('patch', path, fn, options);
  }

  public static delete(path, fn, options?) {
    return Route.route('delete', path, fn, options);
  }

  public static route(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    fn,
    options
  ) {
    return router[method](path, fn);
  }
}
