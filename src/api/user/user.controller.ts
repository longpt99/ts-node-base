import { Response } from 'express';
import * as userService from './user.service';

export async function create(req, res: Response) {
  return userService.create().then((data) => res.success(data));
  // .catch((err) => res.error(err));
}

export async function list() {
  return userService.list();
}

export async function getById() {
  return userService.getById();
}

export async function updateById() {
  return userService.updateById();
}

export async function deleteById() {
  return userService.deleteById();
}
